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
    king: (cell) => {
      const result = [];
      if (
        board.canCastleKingSideWhite &&
        !board.isCheck('white') &&
        cell.name === 'e1' &&
        board.cellByName('f1').figure === null &&
        board.cellByName('g1').figure === null
      ) {
        result.push(...validator.move().castleKingSide().check(cell));
      }
      if (
        board.canCastleKingSideBlack &&
        !board.isCheck('black') &&
        cell.name === 'e8' &&
        board.cellByName('f8').figure === null &&
        board.cellByName('g8').figure === null
      ) {
        result.push(...validator.move().castleKingSide().check(cell));
      }
      if (
        board.canCastleQueenSideWhite &&
        !board.isCheck('white') &&
        cell.name === 'e1' &&
        board.cellByName('d1').figure === null &&
        board.cellByName('c1').figure === null &&
        board.cellByName('b1').figure === null
      ) {
        result.push(...validator.move().castleQueenSide().check(cell));
      }
      if (
        board.canCastleQueenSideBlack &&
        !board.isCheck('black') &&
        cell.name === 'e8' &&
        board.cellByName('d8').figure === null &&
        board.cellByName('c8').figure === null &&
        board.cellByName('b8').figure === null
      ) {
        result.push(...validator.move().castleQueenSide().check(cell));
      }
      result.push(...validator.moveNattack().cross(1).Xcross(1).check(cell));
      return result;
    },
  };

  const availableCells = pieces[cell.figure.type](cell);
  return availableCells;
};
