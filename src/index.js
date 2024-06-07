import FenParser from './fenParser.js';
import renderCell from './renders/renderCell.js';
import pickFigure from './controllers/pickFigure.js';
import ChessBoard from './classes/chessBoard.js';

const domBoard = document.querySelector('.board');
const turn = document.querySelector('.info__turn');
const fenForm = document.querySelector('.fen__form');
const fenInput = document.querySelector('.fen__input');

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
    state.turn = board.currentTurnColor;
    state.cursor = 'idle';
    state.figure = null;
    render();
  }
});

render();
