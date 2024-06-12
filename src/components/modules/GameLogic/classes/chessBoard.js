import FenParser from '../controllers/fenParser.js';
import parse from '../helpers.js';
import getAvailableCells from '../controllers/getAvailableCells.js';
import ChessFigure from './chessFigure.js';

export default class ChessBoard {
  // ### statiscs
  static bounds = {
    startX: 1,
    endX: 8,
    startY: 1,
    endY: 8,
  };

  static cellsXYSymbols = [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], // X axis
    ['1', '2', '3', '4', '5', '6', '7', '8'], // Y axis
  ];

  static isOutOfBounds(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error(`wrong coordinates: x=${x}, y=${y} // must be integer`);
    }
    // prettier-ignore
    if (x < ChessBoard.bounds.startX
      || x > ChessBoard.bounds.endX
      || y < ChessBoard.bounds.startY
      || y > ChessBoard.bounds.endY) return true;
    return false;
  }

  // ### constructor
  constructor(initFEN, playerSide = 'spectator', isVirtualBoard = false) {
    this.isVirtualBoard = isVirtualBoard;
    this.setPlayerSide(playerSide);

    this.currentTurnColor = null; // null ?
    this.canCastleKingSideWhite = true;
    this.canCastleQueenSideWhite = true;
    this.canCastleKingSideBlack = true;
    this.canCastleQueenSideBlack = true;
    this.enpass = null;
    this.fiftyEmptyMovesCounter = 0;
    this.turnsCount = 1;

    this.checkmate = null;
    this.stalemate = null;
    this.autoDraw = false;
    this.fiftyMovesDraw = false;
    this.threeFold = false;
    this.positionsArray = [];

    this.lostFigures = [];
    this.turnsHistory = {};

    this.cells = {};
    this.cellNames = [];
    this.createCells();
    this.kingsCells = { white: null, black: null };
    this.pawnPromotion = null;

    this.fenString = initFEN;
    this.loadFen(this.fenString);

    // this.effect = null;
    // this.activeFigure = {
    //   ref: null,
    //   currentCell: null,
    //   targetCell: null,
    // };
  }

  createCells() {
    for (let x = ChessBoard.bounds.startX; x <= ChessBoard.bounds.endX; x += 1) {
      for (let y = ChessBoard.bounds.startY; y <= ChessBoard.bounds.endY; y += 1) {
        const cellKey = `c${x}${y}`;
        this.cells[cellKey] = {};
        const name = `${ChessBoard.cellsXYSymbols[0][x - 1]}${ChessBoard.cellsXYSymbols[1][y - 1]}`;
        this.cells[cellKey].name = name;
        this.cells[cellKey].xyCoordinates = [x, y];
        this.cells[cellKey].figure = null;
        this.cells[cellKey].cellColor = (x + y) % 2 ? 'white' : 'black';

        this.cellNames.push(name);

        this.cells[cellKey].canMoveToCells = [];
        this.cells[cellKey].canAttackCells = [];
        this.cells[cellKey].underAttackingCells = [];
        this.cells[cellKey].pawnAttackingEmptyCells = [];

        this.cells[cellKey].effect = null;
        this.cells[cellKey].isActive = false;
      }
    }
  }

  setPlayerSide(playerSide) {
    if (playerSide !== 'white' && playerSide !== 'black' && playerSide !== 'spectator') {
      throw new Error(
        `wrong value of "playerSide" argument: ${playerSide} // must be 'white', 'black' or 'spectator'`,
      );
    }
    this.playerSide = playerSide;
  }

  // ### common methods
  getPlayerSide() {
    return this.playerSide;
  }

  isSpectator() {
    return this.playerSide === 'spectator';
  }

  cell(x, y) {
    if (ChessBoard.isOutOfBounds(x, y)) {
      throw new Error(
        `wrong coordinates: x=${x}, y=${y} // must be in the range ${ChessBoard.bounds.endX} x ${ChessBoard.bounds.endY}`,
      );
    }
    return this.cells[`c${x}${y}`];
  }

  getCellKeyByName = (name) => {
    const keys = Object.keys(this.cells);
    return keys.find((key) => this.cells[key].name === name);
  };

  cellByName(name) {
    if (typeof name !== 'string') {
      throw new Error('wrong type of "name" argument // must be a string');
    }
    const cellKey = this.getCellKeyByName(name.toLowerCase());
    if (!cellKey) {
      throw new Error(`wrong value of "name" argument: ${name} // must be in the range 'a1'-'h8'`);
    }
    return this.cells[cellKey];
  }

  getFigureCells() {
    return this.cellNames
      .filter((name) => this.cellByName(name).figure)
      .map((name) => this.cellByName(name));
  }

  // ### cleaning & fen
  cleanEffects() {
    this.cellNames.forEach((name) => {
      if (this.cellByName(name).effect !== 'incheck') this.cellByName(name).effect = null;
      this.cellByName(name).isActive = false;
    });
  }

  clearFigures() {
    this.getFigureCells().forEach((cell) => {
      cell.figure = null;
    });
  }

  clearCheck() {
    if (this.kingsCells.white) this.kingsCells.white.effect = null;
    if (this.kingsCells.black) this.kingsCells.black.effect = null;
  }

  updatePositionsArray() {
    const currentPosition = this.fenString.split(' ').slice(0, -2).join(' ');
    this.positionsArray.push(currentPosition);
    const countCurrentPosition = this.positionsArray.filter((el) => el === currentPosition).length;
    if (countCurrentPosition > 2) this.threeFold = true;
    // if (!this.isVirtualBoard) console.log(countCurrentPosition);
  }

  clearPositionsArray() {
    this.positionsArray = [];
  }

  loadFen(fenString) {
    this.clearFigures();
    this.cleanEffects();
    this.clearCheck();
    this.checkmate = null;
    this.stalemate = null;
    this.autoDraw = false;
    this.fiftyMovesDraw = false;

    const fen = new FenParser(fenString);
    this.enpass = fen.enpass === '-' ? null : fen.enpass;
    this.turnsCount = fen.moveNumber;
    this.fiftyEmptyMovesCounter = fen.halfmoveClock;
    const { castles } = fen;
    this.canCastleKingSideWhite = castles.includes('K');
    this.canCastleQueenSideWhite = castles.includes('Q');
    this.canCastleKingSideBlack = castles.includes('k');
    this.canCastleQueenSideBlack = castles.includes('q');

    const fenArray = fen.positions
      .split('/')
      .reverse()
      .map((row) => row.split(''));
    const positions = fenArray.map((row) => parse(row));
    positions.forEach((row, i) => {
      row.forEach((cell, j) => {
        const cellKey = `c${j + 1}${i + 1}`;
        switch (cell) {
          case 'r':
            this.cells[cellKey].figure = new ChessFigure('rook', 'black');
            break;
          case 'n':
            this.cells[cellKey].figure = new ChessFigure('knight', 'black');
            break;
          case 'b':
            this.cells[cellKey].figure = new ChessFigure('bishop', 'black');
            break;
          case 'k':
            this.cells[cellKey].figure = new ChessFigure('king', 'black');
            this.kingsCells.black = this.cells[cellKey];
            break;
          case 'q':
            this.cells[cellKey].figure = new ChessFigure('queen', 'black');
            break;
          case 'p':
            this.cells[cellKey].figure = new ChessFigure('pawn', 'black');
            break;
          case 'R':
            this.cells[cellKey].figure = new ChessFigure('rook', 'white');
            break;
          case 'N':
            this.cells[cellKey].figure = new ChessFigure('knight', 'white');
            break;
          case 'B':
            this.cells[cellKey].figure = new ChessFigure('bishop', 'white');
            break;
          case 'Q':
            this.cells[cellKey].figure = new ChessFigure('queen', 'white');
            break;
          case 'K':
            this.cells[cellKey].figure = new ChessFigure('king', 'white');
            this.kingsCells.white = this.cells[cellKey];
            break;
          case 'P':
            this.cells[cellKey].figure = new ChessFigure('pawn', 'white');
            break;
          default:
            this.cells[cellKey].figure = null;
        }
      });
    });

    const turnColor = fen.turn === 'w' ? 'white' : 'black';
    this.fenString = fenString;
    if (!this.isVirtualBoard) this.updatePositionsArray();
    // if (!this.isVirtualBoard) console.log('positionsArray: ', this.positionsArray);
    // console.log('fenLoad: turnColor: ', turnColor);
    this.turnPrepare(turnColor);
  }

  setFEN() {
    const fenArray = [];
    for (let y = 8; y >= 1; y -= 1) {
      const rowArray = [];
      let emptyCellsCount = 0;
      for (let x = 1; x <= 8; x += 1) {
        const cellFigure = this.cell(x, y).figure;
        if (cellFigure) {
          if (emptyCellsCount) {
            rowArray.push(emptyCellsCount.toString());
            emptyCellsCount = 0;
          }
          const [figure] = cellFigure.type === 'knight' ? 'n' : cellFigure.type;
          const fenLetter = cellFigure.color === 'white' ? figure.toUpperCase() : figure;
          rowArray.push(fenLetter);
        } else emptyCellsCount += 1;
      }
      if (emptyCellsCount) rowArray.push(emptyCellsCount.toString());
      fenArray.push(rowArray.join(''));
    }

    const newFenColor = this.currentTurnColor === 'black' ? 'w' : 'b';
    const fenEnpass = this.enpass || '-';
    // prettier-ignore
    const fenCastles = [
      this.canCastleKingSideWhite ? 'K' : '',
      this.canCastleQueenSideWhite ? 'Q' : '',
      this.canCastleKingSideBlack ? 'k' : '',
      this.canCastleQueenSideBlack ? 'q' : '',
    ].join('') || '-';
    const fenInfo = ` ${newFenColor} ${fenCastles} ${fenEnpass} ${this.fiftyEmptyMovesCounter} ${this.turnsCount}`;

    this.fenString = `${fenArray.join('/')}${fenInfo}`;
    // if (!this.isVirtualBoard) console.log('board current FEN: ', this.fenString);
  }

  // ### preparing and making turns, history
  turnPrepare(turnColor) {
    this.currentTurnColor = turnColor;
    const figureCells = this.getFigureCells();
    this.setAffects(figureCells);
    this.checkGameState(figureCells);
    if (!this.isVirtualBoard) {
      if (this.currentTurnColor === 'white') this.makeEmptyHistoryTurn();
      // const tempArray = Object.keys(this.turnsHistory).map(
      //   // prettier-ignore
      // eslint-disable-next-line max-len
      //   (key) => `Turn #${this.turnsHistory[key].turn}::: white ${this.turnsHistory[key].figure.white} move: '${this.turnsHistory[key].move.white}' | black ${this.turnsHistory[key].figure.black} move: '${this.turnsHistory[key].move.black}'`,
      // );
      // console.log(tempArray.join('\n'));
      // console.log(this.turnsHistory);
    }
  }

  makeTurn() {
    if (this.currentTurnColor === 'black') this.turnsCount += 1;
    this.setFEN();
  }

  makeEmptyHistoryTurn() {
    this.turnsHistory[`turn${this.turnsCount}`] = {
      turn: this.turnsCount,
      figure: { white: '', black: '' },
      move: { white: '', black: '' },
    };
  }

  addPawnPromotionToHistory(figureType) {
    const allowedFiguresTypes = ['queen', 'bishop', 'knight', 'rook'];
    if (!allowedFiguresTypes.includes(figureType)) {
      throw new Error(
        `figureType = ${figureType}, but must be one of array [ ${allowedFiguresTypes} ]`,
      );
    }
    const currentHistoryMoves = this.turnsHistory[`turn${this.turnsCount}`].move;
    const historyFiguresTypes = ['Q', 'B', 'N', 'R'];
    const historyFigureType = historyFiguresTypes[allowedFiguresTypes.indexOf(figureType)];
    currentHistoryMoves[this.currentTurnColor] = `${
      currentHistoryMoves[this.currentTurnColor]
    } = ${historyFigureType}`;
  }

  // ### checks and processing
  fixKingsAffects(figureCells, kingsCells) {
    // console.log('board.fixKingsAffects()');
    const kingsColors = Object.keys(kingsCells);
    kingsColors.forEach((kingColor) => {
      const allDangerCells = figureCells.reduce((acc, cell) => {
        if (cell.figure.color === kingColor) return acc;
        if (cell.figure.type === 'pawn') {
          return [...acc, ...cell.pawnAttackingEmptyCells];
        }
        return [...acc, ...cell.canMoveToCells];
      }, []);
      const filteredMoveCells = kingsCells[kingColor].canMoveToCells.filter(
        (moveCell) => !allDangerCells.includes(moveCell),
      );
      this.kingsCells[kingColor].canMoveToCells = filteredMoveCells;
    });
  }

  setAffects(figureCells) {
    // console.log('board.setAffects()');
    this.cellNames.forEach((cellName) => {
      this.cellByName(cellName).canMoveToCells = [];
      this.cellByName(cellName).canAttackCells = [];
      this.cellByName(cellName).underAttackingCells = [];
      this.cellByName(cellName).pawnAttackingEmptyCells = [];
    });

    figureCells.forEach((cell) => {
      const availableCells = getAvailableCells(cell, this);
      availableCells.forEach((aCeil) => {
        switch (aCeil.effect) {
          case 'dot':
            cell.canMoveToCells.push(aCeil.name);
            break;
          case 'danger':
            cell.canAttackCells.push(aCeil.name);
            this.cellByName(aCeil.name).underAttackingCells.push(cell.name);
            break;
          case 'pawnCanAttack':
            cell.pawnAttackingEmptyCells.push(aCeil.name);
            break;
          default:
            break;
        }
      });
    });
    this.fixKingsAffects(figureCells, this.kingsCells);
  }

  checkAllMoves(figureCell) {
    // console.log(`checkAllMoves ${figureCell.name}`);
    const figureName = figureCell.name;
    const isVirtualBoard = true;

    const moveCellsNames = [...figureCell.canMoveToCells];
    const attackCellsNames = [...figureCell.canAttackCells];

    const filteredMoves = [];
    const filteredAttacks = [];

    const getIncorrectCastleKingMove = (kingCell, moves) => {
      if (kingCell.name === 'e1' && moves.includes('c1') && !moves.includes('d1')) return 'c1';
      if (kingCell.name === 'e1' && moves.includes('g1') && !moves.includes('f1')) return 'g1';
      if (kingCell.name === 'e8' && moves.includes('c8') && !moves.includes('d8')) return 'c8';
      if (kingCell.name === 'e8' && moves.includes('g8') && !moves.includes('f8')) return 'g8';
      return null;
    };

    moveCellsNames.forEach((cellName) => {
      const testBoard = new ChessBoard(this.fenString, this.currentTurnColor, isVirtualBoard);
      const testFigureCell = testBoard.cellByName(figureName);
      const testTargetCell = testBoard.cellByName(cellName);
      testBoard.moveFigure(testFigureCell, testTargetCell);
      const testFigureCells = testBoard.getFigureCells();
      testBoard.setAffects(testFigureCells);
      const testKingCell = testBoard.kingsCells[testBoard.currentTurnColor];
      if (!testKingCell.underAttackingCells.length) filteredMoves.push(cellName);
    });
    if (figureCell.figure.type === 'king') {
      const incorrectMove = getIncorrectCastleKingMove(figureCell, filteredMoves);
      if (incorrectMove) {
        filteredMoves.splice(filteredMoves.indexOf(incorrectMove), 1);
      }
    }
    figureCell.canMoveToCells = [...filteredMoves];
    // console.log(`canMoveToCells ${figureCell.canMoveToCells}`);

    attackCellsNames.forEach((cellName) => {
      const testBoard = new ChessBoard(this.fenString, this.currentTurnColor, isVirtualBoard);
      const testFigureCell = testBoard.cellByName(figureName);
      const testTargetCell = testBoard.cellByName(cellName);
      testBoard.moveFigure(testFigureCell, testTargetCell);
      const testFigureCells = testBoard.getFigureCells();
      testBoard.setAffects(testFigureCells);
      const testKingCell = testBoard.kingsCells[testBoard.currentTurnColor];
      if (!testKingCell.underAttackingCells.length) filteredAttacks.push(cellName);
    });
    figureCell.canAttackCells = [...filteredAttacks];
  }

  isCheck(kingColor) {
    if (this.kingsCells[kingColor].underAttackingCells.length) {
      return true;
    }
    return false;
  }

  checkGameState(figureCells) {
    if (this.isVirtualBoard) return;
    const currentColor = this.currentTurnColor;
    const currentTurnFigureCells = figureCells.filter((cell) => cell.figure.color === currentColor);
    currentTurnFigureCells.forEach((figureCell) => {
      this.checkAllMoves(figureCell);
    });
    let isAvailableMoves = false;
    currentTurnFigureCells.forEach((cell) => {
      if (cell.canMoveToCells.length || cell.canAttackCells.length) isAvailableMoves = true;
    });
    if (isAvailableMoves && this.isCheck(currentColor)) {
      this.kingsCells[currentColor].effect = 'incheck';
    }
    if (!isAvailableMoves && this.isCheck(currentColor)) {
      this.checkmate = currentColor;
      this.kingsCells[currentColor].effect = 'incheck';
      console.log('CHECKMATE!');
    }
    if (!isAvailableMoves && !this.isCheck(currentColor)) {
      this.stalemate = currentColor;
      console.log('STALEMATE!');
    }
    if (this.fiftyEmptyMovesCounter >= 50) this.fiftyMovesDraw = true;
    if (figureCells.length <= 3) {
      const figures = figureCells.map((cell) => cell.figure.type);
      if (figures.length < 3 || figures.includes('knight') || figures.includes('bishop')) {
        this.autoDraw = true;
      }
    }
  }

  // moves...
  moveFigure(figureCell, targetCell) {
    const canMove = figureCell.canMoveToCells.includes(targetCell.name);
    const canAttack = figureCell.canAttackCells.includes(targetCell.name);
    if (canMove || canAttack) {
      // ##1>
      let castleMoveText;
      const { figure } = figureCell;
      const lostFigure = targetCell.figure;
      if (lostFigure) this.lostFigures.push(lostFigure);
      if (figure.type === 'king') {
        this.kingsCells[figure.color] = targetCell;
        figureCell.effect = null;
        if (figure.color === 'white') {
          this.canCastleKingSideWhite = false;
          this.canCastleQueenSideWhite = false;
        } else {
          this.canCastleKingSideBlack = false;
          this.canCastleQueenSideBlack = false;
        }
        const [currentPosition] = figureCell.xyCoordinates;
        const [targetPosition] = targetCell.xyCoordinates;
        if (Math.abs(currentPosition - targetPosition) === 2 && targetCell.name === 'g1') {
          // ##1>
          castleMoveText = ' O-O';
          this.cellByName('h1').figure = null;
          this.cellByName('f1').figure = new ChessFigure('rook', 'white');
        }
        if (Math.abs(currentPosition - targetPosition) === 2 && targetCell.name === 'g8') {
          // ##1>
          castleMoveText = ' O-O';
          this.cellByName('h8').figure = null;
          this.cellByName('f8').figure = new ChessFigure('rook', 'black');
        }
        if (Math.abs(currentPosition - targetPosition) === 2 && targetCell.name === 'c1') {
          // ##1>
          castleMoveText = ' O-O-O';
          this.cellByName('a1').figure = null;
          this.cellByName('d1').figure = new ChessFigure('rook', 'white');
        }
        if (Math.abs(currentPosition - targetPosition) === 2 && targetCell.name === 'c8') {
          // ##1>
          castleMoveText = ' O-O-O';
          this.cellByName('a8').figure = null;
          this.cellByName('d8').figure = new ChessFigure('rook', 'black');
        }
      }
      if (figure.type === 'rook') {
        switch (figureCell.name) {
          case 'a1':
            this.canCastleQueenSideWhite = false;
            break;
          case 'h1':
            this.canCastleKingSideWhite = false;
            break;
          case 'a8':
            this.canCastleQueenSideBlack = false;
            break;
          case 'h8':
            this.canCastleKingSideBlack = false;
            break;
          default:
            break;
        }
      }
      if (figure.type === 'pawn' && targetCell.name === this.enpass) {
        const [x, y] = targetCell.xyCoordinates;
        if (figure.color === 'white') {
          this.cell(x, y - 1).figure = null;
        } else {
          this.cell(x, y + 1).figure = null;
        }
      }
      if (figure.type === 'pawn') {
        const [, currentPosition] = figureCell.xyCoordinates;
        const [, targetPosition] = targetCell.xyCoordinates;
        if (Math.abs(currentPosition - targetPosition) === 2) {
          const [row, cell] = figureCell.name;
          if (figure.color === 'white') {
            this.enpass = `${row}${Number(cell) + 1}`;
          } else {
            this.enpass = `${row}${Number(cell) - 1}`;
          }
        } else {
          this.enpass = null;
        }
      } else this.enpass = null;
      if (figure.type === 'pawn' || targetCell.figure) {
        this.fiftyEmptyMovesCounter = 0;
      } else this.fiftyEmptyMovesCounter += 1;
      // ##1>
      if (!this.isVirtualBoard) {
        if (castleMoveText) {
          this.turnsHistory[`turn${this.turnsCount}`].figure[figure.color] = 'king';
          this.turnsHistory[`turn${this.turnsCount}`].move[figure.color] = castleMoveText;
        } else {
          // const moveText = castleMoveText || ` ${figureCell.name} - ${targetCell.name}`;
          const moveText = ` ${figureCell.name} - ${targetCell.name}`;
          this.turnsHistory[`turn${this.turnsCount}`].figure[figure.color] = figure.type;
          this.turnsHistory[`turn${this.turnsCount}`].move[figure.color] = moveText;
        }
      }
      // ##1<
      targetCell.figure = figure;
      figureCell.figure = null;
      const [, targetYPosition] = targetCell.xyCoordinates;
      if (figure.type === 'pawn' && (targetYPosition === 1 || targetYPosition === 8)) {
        if (!this.isVirtualBoard) this.pawnPromotion = figure;
        else figure.type = 'queen';
      }
      this.setFEN();
      return true;
    }
    return false;
  }
}
