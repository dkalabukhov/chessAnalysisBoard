import getAvailableCells from "./getAvailableCells.js";

export default (e, state, matrix) => {
  const cellItem = e.target.parentElement;
  const activeCellName = cellItem.dataset.cell;
  state.figure = activeCellName;
  const [cell, row] = activeCellName.split('');
  const figureColor = matrix[row][cell].contains.color;
  if (figureColor === state.turn) {
    const availableCells = getAvailableCells(e.target, matrix);
    availableCells.forEach((availableCell) => {
      const [cell, row] = availableCell.split('');
      if (!matrix[row][cell].contains.type) {
        matrix[row][cell].contains = { type: 'dot' };
      }
    });
    matrix[row][cell].isActive = true;
  }
}