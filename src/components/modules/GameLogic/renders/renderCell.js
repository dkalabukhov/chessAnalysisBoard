/* eslint-disable no-unused-expressions */
import createPiece from './createPiece.js';

export default (boardCell, domCell) => {
  if (boardCell.figure) {
    switch (boardCell.figure.type) {
      case 'pawn': {
        boardCell.figure.color === 'white'
          ? domCell.replaceChildren(createPiece('wPawn'))
          : domCell.replaceChildren(createPiece('bPawn'));
        break;
      }
      case 'rook': {
        boardCell.figure.color === 'white'
          ? domCell.replaceChildren(createPiece('wRook'))
          : domCell.replaceChildren(createPiece('bRook'));
        break;
      }
      case 'knight': {
        boardCell.figure.color === 'white'
          ? domCell.replaceChildren(createPiece('wKnight'))
          : domCell.replaceChildren(createPiece('bKnight'));
        break;
      }
      case 'bishop': {
        boardCell.figure.color === 'white'
          ? domCell.replaceChildren(createPiece('wBishop'))
          : domCell.replaceChildren(createPiece('bBishop'));
        break;
      }
      case 'queen': {
        boardCell.figure.color === 'white'
          ? domCell.replaceChildren(createPiece('wQueen'))
          : domCell.replaceChildren(createPiece('bQueen'));
        break;
      }
      case 'king': {
        boardCell.figure.color === 'white'
          ? domCell.replaceChildren(createPiece('wKing'))
          : domCell.replaceChildren(createPiece('bKing'));
        break;
      }
      default: {
        break;
      }
    }
  } else {
    domCell.innerHTML = '';
  }

  switch (boardCell.effect) {
    case 'dot':
      domCell.classList.add('available');
      break;
    case 'danger':
      domCell.classList.add('danger');
      break;
    case 'incheck':
      domCell.classList.add('incheck');
      break;
    default:
      domCell.classList.remove('available');
      domCell.classList.remove('danger');
      domCell.classList.remove('incheck');
  }

  switch (boardCell.isActive) {
    case true: {
      domCell.classList.add('active-cell');
      break;
    }
    case false: {
      domCell.classList.remove('active-cell');
      break;
    }
    default: {
      return null;
    }
  }
  return null;
};
