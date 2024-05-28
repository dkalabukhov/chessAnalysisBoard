import {
  getField, name2coord, coord2name, getRowAndCell, makeAvailableCell, shiftCell,
} from '../helpers.js';

export default class MoveValidator {
  constructor(matrix) {
    this.matrix = matrix;
    this.checks = [];
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
    this.checks.push(([col, row], colorModifier) => {
      const iterator = ([col, row], remainingRange) => {
        if (remainingRange <= 0) return [];
        if (col > 8 || col < 1 || row > 8 || row < 1) return [];

        const field = getField(this.matrix, [col, row]);
        if (field.contains.type === null) {
          const out = [makeAvailableCell(field.name, 'dot'), ...iterator([col + dX, row + dY * colorModifier], remainingRange - 1)];
          //   console.log(out);
          return out;
        }
        return [];
      };
      return iterator([col + dX, row + dY * colorModifier], range);
    });
    return this;
  }

  move(field) {
    const [col, row] = name2coord(field.name);
    const colorModifier = field.contains.color === 'black' ? -1 : 1;
    console.log('validating move');
    // const actorColor = field.contains.color;
    const validFields = this.checks.reduce((acc, check) => [...acc, ...check([col, row], colorModifier)], []);
    console.log(validFields);
    return validFields;
  }
}
