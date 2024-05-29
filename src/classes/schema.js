import {
  getField, name2coord, makeAvailableCell,
} from '../helpers.js';

export default class actionValidator {
  constructor(matrix, isMove = false, isAttack = false) {
    this.matrix = matrix;
    this.checks = [];
    this.isMove = isMove;
    this.isAttack = isAttack;
    console.log(this);
  }

  knight() {
    this
      .line([1, 2], 1)
      .line([2, 1], 1)
      .line([-1, 2], 1)
      .line([-2, 1], 1)
      .line([1, -2], 1)
      .line([2, -1], 1)
      .line([-1, -2], 1)
      .line([-2, -1], 1);
    return this;
  }

  cross(range) {
    this
      .line([0, 1], range)
      .line([1, 0], range)
      .line([-1, 0], range)
      .line([0, -1], range);
    return this;
  }

  Xcross(range) {
    this
      .line([1, 1], range)
      .line([1, -1], range)
      .line([-1, 1], range)
      .line([-1, -1], range);
    return this;
  }

  line([dX, dY], range) {
    this.checks.push(([col, row], color) => {
      const colorModifier = color === 'black' ? -1 : 1;
      const iterator = ([col, row], remainingRange) => {
        if (remainingRange <= 0) return [];
        if (col > 8 || col < 1 || row > 8 || row < 1) return [];
        const field = getField(this.matrix, [col, row]);
        if ((field.contains.type === null) && this.isMove) {
          const out = [makeAvailableCell(field.name, 'dot'), ...iterator([col + dX, row + dY * colorModifier], remainingRange - 1)];
          return out;
        }
        if (field.contains.type !== null
          && (field.contains.color !== color)
          && this.isAttack) {
          return [makeAvailableCell(field.name, 'danger')];
        }
        return [];
      };
      return iterator([col + dX, row + dY * colorModifier], range);
    });
    return this;
  }

  check(field) {
    const [col, row] = name2coord(field.name);
    const { color } = field.contains;
    const validFields = this
      .checks
      .reduce((acc, check) => [...acc, ...check([col, row], color)], []);
    console.log(validFields);
    return validFields;
  }
}
