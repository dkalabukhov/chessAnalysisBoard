// import getAvailableCells from './getAvailableCells.js';

export default (activeCell, board) => {
  // const availableCells = getAvailableCells(activeCell, board); // << проверка доступных ячеек
  // availableCells.forEach((availableCell) => {
  //   const targetCell = board.cellByName(availableCell.name);
  //   targetCell.effect = availableCell.effect;
  // });
  // board.checkAllMoves(activeCell);
  activeCell.canMoveToCells.forEach((cell) => {
    board.cellByName(cell).effect = 'dot';
  });
  activeCell.canAttackCells.forEach((cell) => {
    board.cellByName(cell).effect = 'danger';
  });
  activeCell.isActive = true;
};
