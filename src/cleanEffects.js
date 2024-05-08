export default (matrix) => {
  Object.keys(matrix).forEach((row) => {
    Object.keys(matrix[row]).forEach((cell) => {
      if (matrix[row][cell].effect) {
        matrix[row][cell].effect = null;
      }
      if (matrix[row][cell].isActive === true) {
        matrix[row][cell].isActive = false;
      }
    });
  });
};
