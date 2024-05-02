import createPiece from "./createPiece.js";

export default (matrixCell, domCell) => {
  switch (matrixCell.contains.type) {
    case 'pawn': {
      matrixCell.contains.color === 'white'
        ? domCell.replaceChildren(createPiece('wPawn'))
        : domCell.replaceChildren(createPiece('bPawn'));
      break;
    }
    case 'rook': {
      matrixCell.contains.color === 'white'
        ? domCell.replaceChildren(createPiece('wRook'))
        : domCell.replaceChildren(createPiece('bRook'));
      break;
    }
    case 'knight': {
      matrixCell.contains.color === 'white'
        ? domCell.replaceChildren(createPiece('wKnight'))
        : domCell.replaceChildren(createPiece('bKnight'));
      break;
    }
    case 'bishop': {
      matrixCell.contains.color === 'white'
        ? domCell.replaceChildren(createPiece('wBishop'))
        : domCell.replaceChildren(createPiece('bBishop'));
      break;
    }
    case 'queen': {
      matrixCell.contains.color === 'white'
        ? domCell.replaceChildren(createPiece('wQueen'))
        : domCell.replaceChildren(createPiece('bQueen'));
      break;
    }
    case 'king': {
      matrixCell.contains.color === 'white'
        ? domCell.replaceChildren(createPiece('wKing'))
        : domCell.replaceChildren(createPiece('bKing'));
      break;
    }
    case 'dot': {
      domCell.classList.add('available');
      break;
    }
    case null: {
      domCell.classList.remove('available');
      break;
    }
    default: {      
      return null;
    }
  }
}