import getAvailableCells from './getAvailableCells.js';

export default (activeCell, board) => {
  const availableCells = getAvailableCells(activeCell, board); // << проверка доступных ячеек
  availableCells.forEach((availableCell) => {
    const targetCell = board.cellByName(availableCell.name);
    targetCell.effect = availableCell.effect;
  });
};
