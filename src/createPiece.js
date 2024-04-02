export default function createPiece(piece) {
  switch (piece) {
    case 'wRook': {
      const wRook = document.createElement('img');
      wRook.setAttribute('src', './assets/wR.svg');
      wRook.setAttribute('alt', 'White Rook');
      return wRook;
    }
    case 'wKnight': {
      const wKnight = document.createElement('img');
      wKnight.setAttribute('src', './assets/wN.svg');
      wKnight.setAttribute('alt', 'White Knight');
      return wKnight;
    }
    case 'wBishop': {
      const wBishop = document.createElement('img');
      wBishop.setAttribute('src', './assets/wB.svg');
      wBishop.setAttribute('alt', 'White Bishop');
      return wBishop;
    }
    case 'wQueen': {
      const wQueen = document.createElement('img');
      wQueen.setAttribute('src', './assets/wQ.svg');
      wQueen.setAttribute('alt', 'White Queen');
      return wQueen;
    }
    case 'wKing': {
      const wKing = document.createElement('img');
      wKing.setAttribute('src', './assets/wK.svg');
      wKing.setAttribute('alt', 'White King');
      return wKing;
    }
    case 'wPawn': {
      const wPawn = document.createElement('img');
      wPawn.setAttribute('src', './assets/wP.svg');
      wPawn.setAttribute('alt', 'White Pawn');
      return wPawn;
    }
    case 'bRook': {
      const bRook = document.createElement('img');
      bRook.setAttribute('src', './assets/bR.svg');
      bRook.setAttribute('alt', 'Black Rook');
      return bRook;
    }
    case 'bKnight': {
      const bKnight = document.createElement('img');
      bKnight.setAttribute('src', './assets/bN.svg');
      bKnight.setAttribute('alt', 'Black Knight');
      return bKnight;
    }
    case 'bBishop': {
      const bBishop = document.createElement('img');
      bBishop.setAttribute('src', './assets/bB.svg');
      bBishop.setAttribute('alt', 'Black Bishop');
      return bBishop;
    }
    case 'bQueen': {
      const bQueen = document.createElement('img');
      bQueen.setAttribute('src', './assets/bQ.svg');
      bQueen.setAttribute('alt', 'Black Queen');
      return bQueen;
    }
    case 'bKing': {
      const bKing = document.createElement('img');
      bKing.setAttribute('src', './assets/bK.svg');
      bKing.setAttribute('alt', 'Black King');
      return bKing;
    }
    case 'bPawn': {
      const bPawn = document.createElement('img');
      bPawn.setAttribute('src', './assets/bP.svg');
      bPawn.setAttribute('alt', 'Black Pawn');
      return bPawn;
    }
    default: {
      throw new Error('Unknown name of the piece');
    }
  }
}
