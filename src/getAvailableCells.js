export default (element, matrix) => {
  const [color, figure] = element.hasAttribute('alt')
    ? element.getAttribute('alt').split(' ')
    : [null, null];

  const [cell, rowString] = element.parentNode.getAttribute('data-cell').split('');
  const row = parseInt(rowString, 10);
  const availableCells = [];

  switch (figure) {
    case 'pawn': {
      if (color === 'white') {
        availableCells.push(matrix[row + 1][cell].name);
        if (row === 2) {
          availableCells.push(matrix[row + 2][cell].name);
        } return availableCells;
      }
      availableCells.push(matrix[row - 1][cell].name);
      if (row === 7) {
        availableCells.push(matrix[row - 2][cell].name);
      } return availableCells;
    }
    default: {
      return [];
    }
  }
};
