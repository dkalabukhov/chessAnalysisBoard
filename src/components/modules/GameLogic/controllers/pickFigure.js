// import getAvailableCells from './getAvailableCells.js';

export default (activeCell, board) => {
  activeCell.canMoveToCells.forEach((cell) => {
    board.cellByName(cell).effect = 'dot';
  });
  activeCell.canAttackCells.forEach((cell) => {
    board.cellByName(cell).effect = 'danger';
  });
  activeCell.isActive = true;
};
