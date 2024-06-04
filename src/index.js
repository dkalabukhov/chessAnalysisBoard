import FenParser from './fenParser.js';
import renderCell from './renders/renderCell.js';
import pickFigure from './controllers/pickFigure.js';
import ChessBoard from './classes/chessBoard.js';
// import getAvailableCells from './controllers/getAvailableCells.js';

const domBoard = document.querySelector('.board');
const turn = document.querySelector('.info__turn');
const fenForm = document.querySelector('.fen__form');
const fenInput = document.querySelector('.fen__input');

const board = new ChessBoard('white');
board.startNewTurn('white');

const state = {
  cursor: 'idle',
  figure: null,
  turn: 'white',
};

const render = () => {
  turn.textContent = `Ход ${state.turn === 'white' ? 'белых' : 'черных'}`;
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
        // const currentDomCell = document.querySelector(`div[data-cell="${state.figure}`);
        // currentDomCell.firstChild.remove();
        // state.turn = state.turn === 'white' ? 'black' : 'white';
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
