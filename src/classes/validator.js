import Schema from "./schema.js";

export default class Validator {
  constructor(matrix) {
    this.matrix = matrix;
  }

  move() {
    const isMove = true;
    const isAttack = false;
    return new Schema(this.matrix, isMove, isAttack);
  }

  attack() {
    const isMove = false;
    const isAttack = true;
    return new Schema(this.matrix, isMove, isAttack);
  }

  moveNattack() {
    const isMove = true;
    const isAttack = true;
    return new Schema(this.matrix, isMove, isAttack);
  }
}
