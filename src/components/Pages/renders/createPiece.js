export default function createPiece(piece) {
  switch (piece) {
    case 'wRook': {
      const wRook = document.createElement('img');
      wRook.setAttribute('src', '../assets/wR.svg');
      wRook.setAttribute('alt', 'white rook');
      return wRook;
    }
    case 'wKnight': {
      const wKnight = document.createElement('img');
      wKnight.setAttribute('src', '../assets/wN.svg');
      wKnight.setAttribute('alt', 'white knight');
      return wKnight;
    }
    case 'wBishop': {
      const wBishop = document.createElement('img');
      wBishop.setAttribute('src', '../assets/wB.svg');
      wBishop.setAttribute('alt', 'white bishop');
      return wBishop;
    }
    case 'wQueen': {
      const wQueen = document.createElement('img');
      wQueen.setAttribute('src', '../assets/wQ.svg');
      wQueen.setAttribute('alt', 'white queen');
      return wQueen;
    }
    case 'wKing': {
      const wKing = document.createElement('img');
      wKing.setAttribute('src', '../assets/wK.svg');
      wKing.setAttribute('alt', 'white king');
      return wKing;
    }
    case 'wPawn': {
      const wPawn = document.createElement('img');
      wPawn.setAttribute('src', '../assets/wP.svg');
      wPawn.setAttribute('alt', 'white pawn');
      return wPawn;
    }
    case 'bRook': {
      const bRook = document.createElement('img');
      bRook.setAttribute('src', '../assets/bR.svg');
      bRook.setAttribute('alt', 'black rook');
      return bRook;
    }
    case 'bKnight': {
      const bKnight = document.createElement('img');
      bKnight.setAttribute('src', '../assets/bN.svg');
      bKnight.setAttribute('alt', 'black knight');
      return bKnight;
    }
    case 'bBishop': {
      const bBishop = document.createElement('img');
      bBishop.setAttribute('src', '../assets/bB.svg');
      bBishop.setAttribute('alt', 'black bishop');
      return bBishop;
    }
    case 'bQueen': {
      const bQueen = document.createElement('img');
      bQueen.setAttribute('src', '../assets/bQ.svg');
      bQueen.setAttribute('alt', 'black queen');
      return bQueen;
    }
    case 'bKing': {
      const bKing = document.createElement('img');
      bKing.setAttribute('src', '../assets/bK.svg');
      bKing.setAttribute('alt', 'black king');
      return bKing;
    }
    case 'bPawn': {
      const bPawn = document.createElement('img');
      bPawn.setAttribute('src', '../assets/bP.svg');
      bPawn.setAttribute('alt', 'black pawn');
      return bPawn;
    }
    default: {
      throw new Error('Unknown name of the piece');
    }
  }
}
