export default (board) => {
  board.cellNames.forEach((name) => {
    board.cellByName(name).effect = null;
    board.cellByName(name).isActive = false;
  });
};
