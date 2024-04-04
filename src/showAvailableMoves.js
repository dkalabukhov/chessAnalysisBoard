const showAvailableMoves = (availableMoves, matrix) => {
  availableMoves.forEach((moveCell) => {
    matrix.forEach((row) => {
      row.forEach((matrixCell) => {
        if (moveCell.name === matrixCell.name) {
          if (matrixCell.contains.type === null) {
            const domCell = document.querySelector(`[data-cell="${matrixCell.name}"]`);
            domCell.classList.add('available');
          }
        }
      });
    });
  });
};

const removeAvailableMoves = () => {
  const cells = document.querySelectorAll('[data-cell]');
  cells.forEach((cell) => cell.classList.remove('available'));
};

export { showAvailableMoves, removeAvailableMoves };
