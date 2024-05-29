import board from "../board.js"

export default class Matrix {
  constructor () {
    this.board = board;
  }
  cleanEffects () {
    Object.keys(this.board).forEach((row) => {
      Object.keys(this.board[row]).forEach((cell) => {
        if (this.board[row][cell].effect) {
          this.board[row][cell].effect = null;
        }
        if (this.board[row][cell].isActive === true) {
          this.board[row][cell].isActive = false;
        }
      });
    });
  }
}