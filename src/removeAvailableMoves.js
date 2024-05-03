export default (matrix) => {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.contains.type === 'dot') {
        cell.contains.type = null;
      }
    });
  });
};
