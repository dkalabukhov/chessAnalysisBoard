import renderCell from './renders/renderCell.js';
import cleanEffects from './controllers/cleanEffects.js';
import pickFigure from './controllers/pickFigure.js';
import ChessBoard from './classes/chessBoard.js';

const state = {
  cursor: 'idle',
  figure: null,
  turn: 'white',
};

const domBoard = document.querySelector('.board');
const info = document.querySelector('.info');

const board = new ChessBoard('white');

const render = () => {
  info.textContent = `Ход ${state.turn === 'white' ? 'белых' : 'черных'}`;
  board.cellNames.forEach((name) => {
    const domCell = document.querySelector(`[data-cell="${name}"]`);
    renderCell(board.cellByName(name), domCell);
  });
};

domBoard.addEventListener('click', (e) => {
  switch (state.cursor) {
    case 'idle': {
      if (e.target.hasAttribute('alt')) {
        const activeCellName = e.target.parentElement.dataset.cell;
        const activeCell = board.cellByName(activeCellName);
        if (activeCell.figure.color === state.turn) {
          state.figure = activeCellName;
          state.cursor = 'active';
          pickFigure(activeCell, board);
          activeCell.isActive = true;
        }
      }
      break;
    }
    case 'active': {
      const targetCellName = e.target.alt
        ? e.target.parentElement.dataset.cell
        : e.target.dataset.cell;
      const targetCell = board.cellByName(targetCellName);
      if (targetCell.figure && targetCell.figure.color === state.turn) {
        cleanEffects(board);
        state.figure = targetCellName;
        pickFigure(targetCell, board);
        targetCell.isActive = true;
        break;
      }
      const hasMoved = board.moveFigure(board.cellByName(state.figure), targetCell);
      if (hasMoved) {
        const currentDomCell = document.querySelector(`div[data-cell="${state.figure}`);
        currentDomCell.firstChild.remove();
        state.turn = state.turn === 'white' ? 'black' : 'white';
      }
      state.cursor = 'idle';
      cleanEffects(board);
      break;
    }
    default: {
      return null;
    }
  }

  render();
});

render();
