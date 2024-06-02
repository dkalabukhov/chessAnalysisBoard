import Validator from '../classes/validator.js';

export default (cell, board) => {
  const validator = new Validator(board);

  // prettier-ignore
  const isInintialPawnPosition = (cellRow, figureColor) => (figureColor === 'black' && cellRow === 7)
  || (figureColor === 'white' && cellRow === 2);

  const pieces = {
    pawn: () => {
      const [, cellRow] = cell.xyCoordinates;
      if (isInintialPawnPosition(cellRow, cell.figure.color)) {
        return [
          ...validator.move().line([0, 1], 2).check(cell),
          ...validator.attack().line([1, 1], 1).line([-1, 1], 1).check(cell),
        ];
      }
      return [
        ...validator.move().line([0, 1], 1).check(cell),
        ...validator.attack().line([1, 1], 1).line([-1, 1], 1).check(cell),
      ];
    },
    bishop: () => validator.moveNattack().Xcross(8).check(cell),
    knight: (cell) => validator.moveNattack().knight().check(cell),
    rook: (cell) => validator.moveNattack().cross(8).check(cell),
    queen: () => validator.moveNattack().cross(8).Xcross(8).check(cell),
    king: () => validator.moveNattack().cross(1).Xcross(1).check(cell),
  };

  const availableCells = pieces[cell.figure.type](cell);
  return availableCells;
};
