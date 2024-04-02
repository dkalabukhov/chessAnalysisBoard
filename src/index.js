import createPiece from './createPiece.js';

const matrix = [
  [{
    name: 'a8',
    contains: {
      type: 'rook',
      color: 'black',
    },
  }, {
    name: 'b8',
    contains: {
      type: 'knight',
      color: 'black',
    },
  }, {
    name: 'c8',
    contains: {
      type: 'bishop',
      color: 'black',
    },
  }, {
    name: 'd8',
    contains: {
      type: 'queen',
      color: 'black',
    },
  }, {
    name: 'e8',
    contains: {
      type: 'king',
      color: 'black',
    },
  }, {
    name: 'f8',
    contains: {
      type: 'bishop',
      color: 'black',
    },
  }, {
    name: 'g8',
    contains: {
      type: 'knight',
      color: 'black',
    },
  }, {
    name: 'h8',
    contains: {
      type: 'rook',
      color: 'black',
    },
  }],
  [{
    name: 'a7',
    contains: {
      type: 'pawn',
      color: 'black',
    },
  }, {
    name: 'b7',
    contains: {
      type: 'pawn',
      color: 'black',
    },
  }, {
    name: 'c7',
    contains: {
      type: 'pawn',
      color: 'black',
    },
  }, {
    name: 'd7',
    contains: {
      type: 'pawn',
      color: 'black',
    },
  }, {
    name: 'e7',
    contains: {
      type: 'pawn',
      color: 'black',
    },
  }, {
    name: 'f7',
    contains: {
      type: 'pawn',
      color: 'black',
    },
  }, {
    name: 'g7',
    contains: {
      type: 'pawn',
      color: 'black',
    },
  }, {
    name: 'h7',
    contains: {
      type: 'pawn',
      color: 'black',
    },
  }],
  [{
    name: 'a6',
    contains: {
      type: null,
    },
  }, {
    name: 'b6',
    contains: {
      type: null,
    },
  }, {
    name: 'c6',
    contains: {
      type: null,
    },
  }, {
    name: 'd6',
    contains: {
      type: null,
    },
  }, {
    name: 'e6',
    contains: {
      type: null,
    },
  }, {
    name: 'f6',
    contains: {
      type: null,
    },
  }, {
    name: 'g6',
    contains: {
      type: null,
    },
  }, {
    name: 'h6',
    contains: {
      type: null,
    },
  }],
  [{
    name: 'a5',
    contains: {
      type: null,
    },
  }, {
    name: 'b5',
    contains: {
      type: null,
    },
  }, {
    name: 'c5',
    contains: {
      type: null,
    },
  }, {
    name: 'd5',
    contains: {
      type: null,
    },
  }, {
    name: 'e5',
    contains: {
      type: null,
    },
  }, {
    name: 'f5',
    contains: {
      type: null,
    },
  }, {
    name: 'g5',
    contains: {
      type: null,
    },
  }, {
    name: 'h5',
    contains: {
      type: null,
    },
  }],
  [{
    name: 'a4',
    contains: {
      type: null,
    },
  }, {
    name: 'b4',
    contains: {
      type: null,
    },
  }, {
    name: 'c4',
    contains: {
      type: null,
    },
  }, {
    name: 'd4',
    contains: {
      type: null,
    },
  }, {
    name: 'e4',
    contains: {
      type: null,
    },
  }, {
    name: 'f4',
    contains: {
      type: null,
    },
  }, {
    name: 'g4',
    contains: {
      type: null,
    },
  }, {
    name: 'h4',
    contains: {
      type: null,
    },
  }],
  [{
    name: 'a3',
    contains: {
      type: null,
    },
  }, {
    name: 'b3',
    contains: {
      type: null,
    },
  }, {
    name: 'c3',
    contains: {
      type: null,
    },
  }, {
    name: 'd3',
    contains: {
      type: null,
    },
  }, {
    name: 'e3',
    contains: {
      type: null,
    },
  }, {
    name: 'f3',
    contains: {
      type: null,
    },
  }, {
    name: 'g3',
    contains: {
      type: null,
    },
  }, {
    name: 'h3',
    contains: {
      type: null,
    },
  }],
  [{
    name: 'a2',
    contains: {
      type: 'pawn',
      color: 'white',
    },
  }, {
    name: 'b2',
    contains: {
      type: 'pawn',
      color: 'white',
    },
  }, {
    name: 'c2',
    contains: {
      type: 'pawn',
      color: 'white',
    },
  }, {
    name: 'd2',
    contains: {
      type: 'pawn',
      color: 'white',
    },
  }, {
    name: 'e2',
    contains: {
      type: 'pawn',
      color: 'white',
    },
  }, {
    name: 'f2',
    contains: {
      type: 'pawn',
      color: 'white',
    },
  }, {
    name: 'g2',
    contains: {
      type: 'pawn',
      color: 'white',
    },
  }, {
    name: 'h2',
    contains: {
      type: 'pawn',
      color: 'white',
    },
  }],
  [{
    name: 'a1',
    contains: {
      type: 'rook',
      color: 'white',
    },
  }, {
    name: 'b1',
    contains: {
      type: 'knight',
      color: 'white',
    },
  }, {
    name: 'c1',
    contains: {
      type: 'bishop',
      color: 'white',
    },
  }, {
    name: 'd1',
    contains: {
      type: 'queen',
      color: 'white',
    },
  }, {
    name: 'e1',
    contains: {
      type: 'king',
      color: 'white',
    },
  }, {
    name: 'f1',
    contains: {
      type: 'bishop',
      color: 'white',
    },
  }, {
    name: 'g1',
    contains: {
      type: 'knight',
      color: 'white',
    },
  }, {
    name: 'h1',
    contains: {
      type: 'rook',
      color: 'white',
    },
  }],

];

// const pieces = {
//   pawn: {},
//   rook: {},
//   king: {},
//   queen: {},
//   knight: {},
//   bishop: {},
// };

const board = document.querySelector('.board');
function render() {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      const [cellY, cellX] = cell.name.split('');
      const currRow = board.querySelector(`[data-row="${cellX}"]`);
      const currCell = currRow.querySelector(`[data-cell="${cellY}"]`);
      switch (cell.contains.type) {
        case 'pawn': {
          cell.contains.color === 'white'
            ? currCell.replaceChildren(createPiece('wPawn'))
            : currCell.replaceChildren(createPiece('bPawn'));
          break;
        }
        case 'rook': {
          cell.contains.color === 'white'
            ? currCell.replaceChildren(createPiece('wRook'))
            : currCell.replaceChildren(createPiece('bRook'));
          break;
        }
        case 'knight': {
          cell.contains.color === 'white'
            ? currCell.replaceChildren(createPiece('wKnight'))
            : currCell.replaceChildren(createPiece('bKnight'));
          break;
        }
        case 'bishop': {
          cell.contains.color === 'white'
            ? currCell.replaceChildren(createPiece('wBishop'))
            : currCell.replaceChildren(createPiece('bBishop'));
          break;
        }
        case 'queen': {
          cell.contains.color === 'white'
            ? currCell.replaceChildren(createPiece('wQueen'))
            : currCell.replaceChildren(createPiece('bQueen'));
          break;
        }
        case 'king': {
          cell.contains.color === 'white'
            ? currCell.replaceChildren(createPiece('wKing'))
            : currCell.replaceChildren(createPiece('bKing'));
          break;
        }
        default: {
          return null;
        }
      }
    });
  });
}

render();
