export default (element, matrix) => {
  const [color, figure] = element.hasAttribute('alt')
    ? element.getAttribute('alt').split(' ')
    : [null, null];

  const [cell, rowString] = element.parentNode.getAttribute('data-cell').split('');
  const row = parseInt(rowString, 10);

  switch (figure) {
    case 'pawn': {
      if (color === 'white') {
        const availableCell1 = matrix[row + 1][cell];
        if (row === 2) {
          const availableCell2 = matrix[row + 2][cell];
          return [availableCell1.name, availableCell2.name];
        } return [availableCell1.name];
      }
      const availableCell1 = matrix[row - 1][cell];
      if (row === 7) {
        const availableCell2 = matrix[row - 2][cell];
        return [availableCell1.name, availableCell2.name];
      } return [availableCell1.name];
    }
    default: {
      return [];
    }
  }
};
