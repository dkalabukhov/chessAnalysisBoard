import MoveValidator from "./classes/moveValidator.js";
import {
  getField, name2coord, getRowAndCell, makeAvailableCell, shiftCell,
} from "./helpers.js";

export default (element, matrix) => {
  const [color, figure] = element.hasAttribute("alt")
    ? element.getAttribute("alt").split(" ")
    : [null, null];

  const cellName = element.parentNode.getAttribute("data-cell");

  const field = getField(matrix, name2coord(cellName));

  const [rowString, cell] = getRowAndCell(cellName);
  const row = parseInt(rowString, 10);

  const validator = new MoveValidator(matrix);
  const availableCells = validator.knight().move(field);
  // console.log(MoveValidator(matrix).validator.line([0, 1], 1).line([1, 1], 1).move(field));
  return availableCells;

  // switch (figure) {
  //   case 'pawn': {
  //     if (color === 'white') {
  //       availableCells.push(makeAvailableCell(matrix[row + 1][cell].name, 'dot'));
  //       if (matrix[row + 1][shiftCell(cell, -1)].contains.type && matrix[row + 1][shiftCell(cell, -1)].contains.color === 'black') {
  //         availableCells.push(makeAvailableCell(matrix[row + 1][shiftCell(cell, -1)].name, 'danger'));
  //       }
  //       if (matrix[row + 1][shiftCell(cell, 1)].contains.type && matrix[row + 1][shiftCell(cell, 1)].contains.color === 'black') {
  //         availableCells.push(makeAvailableCell(matrix[row + 1][shiftCell(cell, 1)].name, 'danger'));
  //       }
  //       if (row === 2) {
  //         availableCells.push(makeAvailableCell(matrix[row + 2][cell].name, 'dot'));
  //       }
  //       console.log(availableCells);
  //       return availableCells;
  //     }
  //     availableCells.push(makeAvailableCell(matrix[row - 1][cell].name, 'dot'));
  //     if (row === 7) {
  //       availableCells.push(makeAvailableCell(matrix[row - 2][cell].name, 'dot'));
  //     }
  //     console.log(availableCells);
  //     return availableCells;
  //   }
  //   default: {
  //     return [];
  //   }
  // }
  // return [];
};
