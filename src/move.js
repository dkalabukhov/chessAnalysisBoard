import { getRowAndCell } from "./helpers.js";

export default (matrix, targetCell, figure) => {
  const [trow, tcell] = getRowAndCell(targetCell);
  const [currentRow, currentCell] = getRowAndCell(figure);

  if (matrix[trow][tcell].effect) {
    matrix[trow][tcell].contains = matrix[currentRow][currentCell].contains;
    matrix[currentRow][currentCell].contains = { type: null };

    const currentDomCell = document.querySelector(`div[data-cell="${figure}`);
    currentDomCell.firstChild.remove();
    return true;
  }
  return false;
};
