export default (matrix, targetCell, figure) => {
  if (!targetCell) {
    return false
  }
  const [tcell, trow] = targetCell.split('');
  const [currentCell, currentRow] = figure.split('');
  matrix[trow][tcell].contains = matrix[currentRow][currentCell].contains;
  matrix[currentRow][currentCell].contains = { type: null }
}