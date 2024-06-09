import FenParser from './fenParser.js';
import renderCell from './renders/renderCell.js';
import pickFigure from './controllers/pickFigure.js';
import ChessBoard from './classes/chessBoard.js';
import renderModal from './renders/renderModal.js';

const domBoard = document.querySelector('.board');
const turn = document.querySelector('.info__turn');
const fenForm = document.querySelector('.fen__form');
const fenInput = document.querySelector('.fen__input');
const table = document.querySelector('tbody');
const boardFEN = document.querySelector('.board__fen');
const pickFigureModal = document.querySelector('.pickFigureModal');
const modalPieces = document.querySelector('.pickFigureModal__pieces');
const queen = document.createElement('img');
const bishop = document.createElement('img');
const knight = document.createElement('img');
const rook = document.createElement('img');
queen.setAttribute('data-name', 'queen');
bishop.setAttribute('data-name', 'bishop');
knight.setAttribute('data-name', 'knight');
rook.setAttribute('data-name', 'rook');
modalPieces.append(queen, bishop, knight, rook);
const pieces = [queen, bishop, knight, rook];

const state = {
  cursor: 'idle',
  figure: null,
  turn: 'white',
};

const initFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const playerSide = 'white';
const board = new ChessBoard(initFEN, playerSide);
// board.startNewTurn('white');

const render = () => {
  if (board.pawnPromotion) {
    renderModal(pieces, pickFigureModal, board.pawnPromotion);
  }
  if (board.checkmate) {
    turn.classList.add('incheck');
    turn.textContent = `Королю ${state.turn === 'white' ? 'белых' : 'черных'} МАТ!`;
  } else if (board.stalemate) {
    turn.classList.add('incheck');
    turn.textContent = 'ПАТ!';
  } else if (board.autoDraw) {
    turn.classList.add('incheck');
    turn.textContent = 'Боевая НИЧЬЯ!';
  } else turn.textContent = `Ход ${state.turn === 'white' ? 'белых' : 'черных'}`;
  board.cellNames.forEach((name) => {
    const domCell = document.querySelector(`[data-cell="${name}"]`);
    renderCell(board.cellByName(name), domCell);
  });
  console.log(boardFEN);
  boardFEN.textContent = board.fenString;
};

const renderMovesTable = () => {
  table.innerHTML = '';
  const keys = Object.keys(board.turnsHistory);
  keys.forEach((key) => {
    const { figure, move, turn } = board.turnsHistory[key];
    const { white, black } = move;
    const tr = document.createElement('tr');
    const turnNumber = document.createElement('td');
    const whiteMoveCell = document.createElement('td');
    const blackMoveCell = document.createElement('td');
    const whiteIcon = document.createElement('img');
    const blackIcon = document.createElement('img');
    switch (figure.white) {
      case 'pawn':
        whiteIcon.setAttribute('src', './assets/wP.svg');
        break;
      case 'knight':
        whiteIcon.setAttribute('src', './assets/wN.svg');
        break;
      case 'bishop':
        whiteIcon.setAttribute('src', './assets/wB.svg');
        break;
      case 'rook':
        whiteIcon.setAttribute('src', './assets/wR.svg');
        break;
      case 'queen':
        whiteIcon.setAttribute('src', './assets/wQ.svg');
        break;
      case 'king':
        whiteIcon.setAttribute('src', './assets/wK.svg');
        break;
      default:
        break;
    }
    switch (figure.black) {
      case 'pawn':
        blackIcon.setAttribute('src', './assets/bP.svg');
        break;
      case 'knight':
        blackIcon.setAttribute('src', './assets/bN.svg');
        break;
      case 'bishop':
        blackIcon.setAttribute('src', './assets/bB.svg');
        break;
      case 'rook':
        blackIcon.setAttribute('src', './assets/bR.svg');
        break;
      case 'queen':
        blackIcon.setAttribute('src', './assets/bQ.svg');
        break;
      case 'king':
        blackIcon.setAttribute('src', './assets/bK.svg');
        break;
      default:
        break;
    }
    turnNumber.textContent = turn;
    turnNumber.classList.add('table-secondary');
    whiteMoveCell.textContent = white;
    if (whiteMoveCell.textContent === '') {
      whiteMoveCell.textContent = '...';
    }
    if (figure.white) whiteMoveCell.prepend(whiteIcon);
    whiteMoveCell.classList.add('table-light');
    blackMoveCell.textContent = black;
    if (figure.black) blackMoveCell.prepend(blackIcon);
    blackMoveCell.classList.add('table-light');
    if (figure.white || figure.black) {
      tr.append(turnNumber, whiteMoveCell, blackMoveCell);
      table.append(tr);
    }
  });
};

domBoard.addEventListener('click', (e) => {
  switch (state.cursor) {
    case 'idle': {
      // console.log('domBoard click event: state.cursor = idle');
      if (e.target.hasAttribute('alt')) {
        const activeCellName = e.target.parentElement.dataset.cell;
        const activeCell = board.cellByName(activeCellName);
        if (activeCell.figure.color === state.turn) {
          state.figure = activeCellName;
          state.cursor = 'active';
          pickFigure(activeCell, board);
        }
      }
      break;
    }
    case 'active': {
      // console.log('domBoard click event: state.cursor = active');
      const targetCellName = e.target.alt
        ? e.target.parentElement.dataset.cell
        : e.target.dataset.cell;
      const targetCell = board.cellByName(targetCellName);
      if (targetCell.figure && targetCell.figure.color === state.turn) {
        board.cleanEffects();
        state.figure = targetCellName;
        pickFigure(targetCell, board);
        targetCell.isActive = true;
        break;
      }
      const hasMoved = board.moveFigure(board.cellByName(state.figure), targetCell);
      if (hasMoved) {
        // state.turn = state.turn === 'white' ? 'black' : 'white';
        board.clearCheck();
        board.startNewTurn();
        state.turn = board.currentTurnColor;
        renderMovesTable();
      }
      state.cursor = 'idle';
      board.cleanEffects();
      break;
    }
    default: {
      return null;
    }
  }

  render();
});

fenForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fenString = fenInput.value.trim();
  if (!FenParser.isFen(fenString)) {
    // eslint-disable-next-line no-alert
    alert('Неверный FEN!');
  } else {
    board.setupPositionFromFen(fenString);
    renderMovesTable();
    state.turn = board.currentTurnColor;
    state.cursor = 'idle';
    state.figure = null;
    render();
  }
});

pieces.forEach((piece) => {
  piece.classList.add('pickFigureModal__piece');
  piece.addEventListener('click', (e) => {
    pickFigureModal.style.display = 'none';
    board.pawnPromotion.type = e.target.dataset.name;
    board.pawnPromotion = null;
    board.setFEN();
    const figureCells = board.getFigureCells();
    board.setAffects(figureCells);
    board.checkGameState(figureCells);
    render();
  });
});

render();
