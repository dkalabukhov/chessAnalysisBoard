import actionValidator from "./schema.js";

export default class Validator {
  constructor(matrix) {
    this.matrix = matrix;
  }

  move() {
    const isMove = true;
    const isAttack = false;
    return new actionValidator(this.matrix, isMove, isAttack);
  }

  attack() {
    const isMove = false;
    const isAttack = true;
    return new actionValidator(this.matrix, isMove, isAttack);
  }

  moveNattack() {
    const isMove = true;
    const isAttack = true;
    return new actionValidator(this.matrix, isMove, isAttack);
  }
}
