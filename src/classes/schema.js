const makeAvailableCell = (name, effect) => ({ name, effect });

export default class Schema {
  constructor(board, isMove = false, isAttack = false) {
    this.board = board;
    this.checks = [];
    this.isMove = isMove;
    this.isAttack = isAttack;
  }

  knight() {
    this.line([1, 2], 1)
      .line([2, 1], 1)
      .line([-1, 2], 1)
      .line([-2, 1], 1)
      .line([1, -2], 1)
      .line([2, -1], 1)
      .line([-1, -2], 1)
      .line([-2, -1], 1);
    return this;
  }

  castleKingSide() {
    this.line([2, 0], 1);
    return this;
  }

  castleQueenSide() {
    this.line([-2, 0], 1);
    return this;
  }

  cross(range) {
    this.line([0, 1], range).line([1, 0], range).line([-1, 0], range).line([0, -1], range);
    return this;
  }

  Xcross(range) {
    this.line([1, 1], range).line([1, -1], range).line([-1, 1], range).line([-1, -1], range);
    return this;
  }

  line([dX, dY], range) {
    this.checks.push(([col, row], color, isPawn) => {
      const colorModifier = color === 'black' ? -1 : 1;
      const iterator = ([col, row], remainingRange) => {
        if (remainingRange <= 0) return [];
        if (col > 8 || col < 1 || row > 8 || row < 1) return [];
        const cell = this.board.cell(col, row);
        if (!cell.figure && this.isMove) {
          const out = [
            makeAvailableCell(cell.name, 'dot'),
            ...iterator([col + dX, row + dY * colorModifier], remainingRange - 1),
          ];
          return out;
        }
        if (cell.figure && cell.figure.color !== color && this.isAttack) {
          return [makeAvailableCell(cell.name, 'danger')];
        }
        if (!cell.figure && isPawn) {
          if (cell.name !== this.board.enpass) {
            return [makeAvailableCell(cell.name, 'pawnCanAttack')];
          }
          return [makeAvailableCell(cell.name, 'dot'), makeAvailableCell(cell.name, 'pawnCanAttack')];
        }
        return [];
      };
      return iterator([col + dX, row + dY * colorModifier], range);
    });
    return this;
  }

  check(cell) {
    const [cellX, cellY] = cell.xyCoordinates;
    const { color } = cell.figure;
    const isPawn = cell.figure.type === 'pawn';
    const validFields = this.checks
      .reduce((acc, check) => [...acc, ...check([cellX, cellY], color, isPawn)], []);
    return validFields;
  }
}
