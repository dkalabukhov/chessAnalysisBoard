export default (matrix, targetCell, figure) => {
  if (!targetCell) {
    return false;
  }

  const [tcell, trow] = targetCell.split('');
  const [currentCell, currentRow] = figure.split('');

  if (matrix[trow][tcell].contains.type === 'dot') {
    matrix[trow][tcell].contains = matrix[currentRow][currentCell].contains;
    matrix[currentRow][currentCell].contains = { type: null };

    const currentDomCell = document.querySelector(`div[data-cell="${figure}`);
    currentDomCell.firstChild.remove();
    return true;
  }
  if (matrix[trow][tcell].contains.type === 'dot') {
    matrix[trow][tcell].contains = matrix[currentRow][currentCell].contains;
    matrix[currentRow][currentCell].contains = { type: null };

    const currentDomCell = document.querySelector(`div[data-cell="${figure}`);
    currentDomCell.firstChild.remove();
    return true;
  }
  return false;
};
