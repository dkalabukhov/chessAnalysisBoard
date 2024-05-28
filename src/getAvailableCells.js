import { getRowAndCell, makeAvailableCell, shiftCell } from './helpers.js';

export default (element, matrix) => {
  const [color, figure] = element.hasAttribute('alt')
    ? element.getAttribute('alt').split(' ')
    : [null, null];

  const cellName = element.parentNode.getAttribute('data-cell');
  const [rowString, cell] = getRowAndCell(cellName);
  const row = parseInt(rowString, 10);
  const availableCells = [];

  switch (figure) {
    case 'pawn': {
      if (color === 'white') {
        availableCells.push(makeAvailableCell(matrix[row + 1][cell].name, 'dot'));
        if (matrix[row + 1][shiftCell(cell, -1)].contains.type && matrix[row + 1][shiftCell(cell, -1)].contains.color === 'black') {
          availableCells.push(makeAvailableCell(matrix[row + 1][shiftCell(cell, -1)].name, 'danger'));
        }
        if (matrix[row + 1][shiftCell(cell, 1)].contains.type && matrix[row + 1][shiftCell(cell, 1)].contains.color === 'black') {
          availableCells.push(makeAvailableCell(matrix[row + 1][shiftCell(cell, 1)].name, 'danger'));
        }
        if (row === 2) {
          availableCells.push(makeAvailableCell(matrix[row + 2][cell].name, 'dot'));
        } return availableCells;
      }
      availableCells.push(makeAvailableCell(matrix[row - 1][cell].name, 'dot'));
      if (row === 7) {
        availableCells.push(makeAvailableCell(matrix[row - 2][cell].name, 'dot'));
      } return availableCells;
    }
    default: {
      return [];
    }
  }
};
