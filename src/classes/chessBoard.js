import FenParser from '../fenParser.js';
import parse from '../helpers.js';
import getAvailableCells from '../controllers/getAvailableCells.js';
import ChessFigure from './chessFigure.js';
// const figureTypes = ['king', 'queen', 'bishop', 'knight', 'rook', 'pawn'];

export default class ChessBoard {
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

  constructor(playerSide = 'spectator') {
    this.cells = {};
    this.cellNames = [];
    this.createCells();
    this.placeAllFigures();
    this.setPlayerSide(playerSide);

    this.currentTurnColor = null;

    this.activeFigure = {
      ref: null,
      currentCell: null,
      targetCell: null,
    };

    this.effect = null;
    this.isActive = false;
    this.lostFigures = [];

    this.inCheckKing = null;
    this.checkMateKing = null;
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
      }
    }
  }

  placeAllFigures() {
    this.cells.c11.figure = new ChessFigure('rook', 'white');
    this.cells.c21.figure = new ChessFigure('knight', 'white');
    this.cells.c31.figure = new ChessFigure('bishop', 'white');
    this.cells.c41.figure = new ChessFigure('queen', 'white');
    this.cells.c51.figure = new ChessFigure('king', 'white');
    this.cells.c61.figure = new ChessFigure('bishop', 'white');
    this.cells.c71.figure = new ChessFigure('knight', 'white');
    this.cells.c81.figure = new ChessFigure('rook', 'white');
    this.cells.c12.figure = new ChessFigure('pawn', 'white');
    this.cells.c22.figure = new ChessFigure('pawn', 'white');
    this.cells.c32.figure = new ChessFigure('pawn', 'white');
    this.cells.c42.figure = new ChessFigure('pawn', 'white');
    this.cells.c52.figure = new ChessFigure('pawn', 'white');
    this.cells.c62.figure = new ChessFigure('pawn', 'white');
    this.cells.c72.figure = new ChessFigure('pawn', 'white');
    this.cells.c82.figure = new ChessFigure('pawn', 'white');

    this.cells.c18.figure = new ChessFigure('rook', 'black');
    this.cells.c28.figure = new ChessFigure('knight', 'black');
    this.cells.c38.figure = new ChessFigure('bishop', 'black');
    this.cells.c48.figure = new ChessFigure('queen', 'black');
    this.cells.c58.figure = new ChessFigure('king', 'black');
    this.cells.c68.figure = new ChessFigure('bishop', 'black');
    this.cells.c78.figure = new ChessFigure('knight', 'black');
    this.cells.c88.figure = new ChessFigure('rook', 'black');
    this.cells.c17.figure = new ChessFigure('pawn', 'black');
    this.cells.c27.figure = new ChessFigure('pawn', 'black');
    this.cells.c37.figure = new ChessFigure('pawn', 'black');
    this.cells.c47.figure = new ChessFigure('pawn', 'black');
    this.cells.c57.figure = new ChessFigure('pawn', 'black');
    this.cells.c67.figure = new ChessFigure('pawn', 'black');
    this.cells.c77.figure = new ChessFigure('pawn', 'black');
    this.cells.c87.figure = new ChessFigure('pawn', 'black');

    this.kingsCells = { white: this.cells.c51, black: this.cells.c58 };
  }

  clearFigures() {
    this.getFigureCells().forEach((cell) => {
      cell.figure = null;
    });
  }

  setupPositionFromFen(fenString) {
    this.clearFigures();
    const fen = new FenParser(fenString);
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
    this.cleanEffects();
    const newTurnColor = fen.turn === 'w' ? 'white' : 'black';
    this.startNewTurn(newTurnColor);
  }

  setPlayerSide(playerSide) {
    if (playerSide !== 'white' && playerSide !== 'black' && playerSide !== 'spectator') {
      throw new Error(`wrong value of "playerSide" argument: ${playerSide} // must be 'white', 'black' or 'spectator'`);
    }
    this.playerSide = playerSide;
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

  // setKingCell(color, cell) {
  //   const king = this.kingsCells[color].figure;
  //   this.kingsCells[color].figure = null;
  //   this.kingsCells[color] = cell;
  //   this.kingsCells[color].figure = king;
  // }

  moveFigure(figureCell, targetCell) {
    if (targetCell.effect) {
      const { figure } = figureCell;
      const lostFigure = targetCell.figure;
      if (lostFigure) this.lostFigures.push(lostFigure);
      if (figure.type === 'king') this.kingsCells[figure.color] = targetCell;
      targetCell.figure = figure;
      figureCell.figure = null;
      return true;
    }
    return false;
  }

  getFigureCells() {
    return this.cellNames.filter((name) => this.cellByName(name).figure).map((name) => this.cellByName(name));
  }

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

  cleanEffects() {
    this.cellNames.forEach((name) => {
      this.cellByName(name).effect = null;
      this.cellByName(name).isActive = false;
    });
  }

  isCheck(kingColor) {
    if (this.kingsCells[kingColor].underAttackingCells.length) {
      this.inCheckKing = kingColor;
      console.log(`The ${kingColor} king is in check!`);
      // if (!this.kingsCells[kingColor].canMoveToCells.length) {
      //   this.checkMateKing = kingColor;
      //   console.log(`The checkMateKing!`);
      // }
    } else this.inCheckKing = null;
  }

  startNewTurn(newTurnColor = null) {
    // console.log('board.startNewTurn()');
    if (newTurnColor) this.currentTurnColor = newTurnColor;
    else this.currentTurnColor = this.currentTurnColor === 'white' ? 'black' : 'white';
    const figureCells = this.getFigureCells();
    this.setAffects(figureCells);
    this.isCheck(this.currentTurnColor);
  }
}

// const playerSide = 'black';
// const board = new ChessBoard(playerSide); // ход на белом (по умолчанию при создании доски)
// console.log('Обращение к свойству напрямую: \n', board.cells.c11);
// console.log('\nОбращение к свойству через метод: \n', board.cell(1, 1));
// console.log('\nОбращение к свойству через метод (по имени клетки): \n', board.cellByName('B1'));
// board.endOfTurn(); // переход хода к черному
// const { currentTurnColor } = board;
// console.log('\nКто сейчас ходит: \n', currentTurnColor);
// const json = JSON.stringify(board);
// console.log(json);
// const parse = JSON.parse(json);
// console.log(parse);
