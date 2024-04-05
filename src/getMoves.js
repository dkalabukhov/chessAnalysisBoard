export default (element, matrix) => {
  const cellsToIntegers = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
  };

  const [color, figure] = element.hasAttribute('alt')
    ? element.getAttribute('alt').split(' ')
    : [null, null];

  const [cell, rowString] = element.parentNode.getAttribute('data-cell').split('');
  const row = parseInt(rowString, 10);

  switch (figure) {
    case 'pawn': {
      if (color === 'white') {
        const availableCell1 = matrix[row][cellsToIntegers[cell]];
        if (row === 2) {
          const availableCell2 = matrix[row + 1][cellsToIntegers[cell]];
          return [availableCell1, availableCell2];
        } return [availableCell1];
      }
      const availableCell1 = matrix[row - 2][cellsToIntegers[cell]];
      if (row === 7) {
        const availableCell2 = matrix[row - 3][cellsToIntegers[cell]];
        return [availableCell1, availableCell2];
      } return [availableCell1];
    }
    default: {
      return null;
    }
  }
};
