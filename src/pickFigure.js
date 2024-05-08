/* eslint-disable no-shadow */
import getAvailableCells from './getAvailableCells.js';
import { getRowAndCell } from './helpers.js';

export default (e, state, matrix) => {
  const cellItem = e.target.parentElement;
  const activeCellName = cellItem.dataset.cell;
  state.figure = activeCellName;
  const [row, cell] = getRowAndCell(activeCellName);
  const figureColor = matrix[row][cell].contains.color;
  if (figureColor === state.turn) {
    const availableCells = getAvailableCells(e.target, matrix);
    availableCells.forEach((availableCell) => {
      const [row, cell] = getRowAndCell(availableCell.name);
      if (!matrix[row][cell].contains.type) {
        matrix[row][cell].effect = availableCell.effect;
      }
      if (matrix[row][cell].contains.type && availableCell.effect === 'danger') {
        matrix[row][cell].effect = availableCell.effect;
      }
    });
    matrix[row][cell].isActive = true;
  }
};
