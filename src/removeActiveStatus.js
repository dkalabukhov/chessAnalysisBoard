export default (matrix) => {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.isActive === true) {
        cell.isActive = false;
      }
    });
  });
};
