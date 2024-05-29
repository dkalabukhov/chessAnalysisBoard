import Validator from "./classes/validator.js";
import { getField, name2coord } from "./helpers.js";

export default (element, matrix) => {
  const cellName = element.parentNode.getAttribute("data-cell");
  const field = getField(matrix, name2coord(cellName));

  const validator = new Validator(matrix);
  const [col, row] = name2coord(field.name);
  const { color } = field.contains;

  const isInintialPawnPosition = (row, color) => (color === 'black' && row === 7) || (color === 'white' && row === 2);

  const pieces = {
    pawn: () => {
      if (isInintialPawnPosition(row, color)) {
        return [...validator.move().line([0, 1], 2).check(field),
          ...validator.attack().line([1, 1], 1).line([-1, 1], 1).check(field)];
      }
      return [...validator.move().line([0, 1], 1).check(field),
        ...validator.attack().line([1, 1], 1).line([-1, 1], 1).check(field)];
    },
    bishop: () => validator.moveNattack().Xcross(8).check(field),
    knight: (field) => validator.moveNattack().knight().check(field),
    rook: (field) => validator.moveNattack().cross(8).check(field),
    queen: () => validator.moveNattack().cross(8).Xcross(8).check(field),
    king: () => validator.moveNattack().cross(1).Xcross(1).check(field),
  };

  const availableCells = pieces[field.contains.type](field);
  return availableCells;
};
