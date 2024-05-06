export default (matrix) => {
  Object.keys(matrix).forEach((row) => {
    Object.keys(matrix[row]).forEach((cell) => {
      if (matrix[row][cell].contains.type === 'dot') {
        matrix[row][cell].contains.type = null;
      }
      if (matrix[row][cell].isActive === true) {
        matrix[row][cell].isActive = false;
      }
    });
  });
};
