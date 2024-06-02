import Schema from './schema.js';

export default class Validator {
  constructor(board) {
    this.board = board;
  }

  move() {
    const isMove = true;
    const isAttack = false;
    return new Schema(this.board, isMove, isAttack);
  }

  attack() {
    const isMove = false;
    const isAttack = true;
    return new Schema(this.board, isMove, isAttack);
  }

  moveNattack() {
    const isMove = true;
    const isAttack = true;
    return new Schema(this.board, isMove, isAttack);
  }
}
