import renderCell from './renderCell.js';
import cleanEffects from './cleanEffects.js';
import move from './move.js';
import pickFigure from './pickFigure.js';

const matrix = {
  1: {
    a: {
      name: 'a1',
      contains: {
        type: 'rook',
        color: 'white',
      },
      isActive: false,
    },
    b: {
      name: 'b1',
      contains: {
        type: 'knight',
        color: 'white',
      },
      isActive: false,
    },
    c: {
      name: 'c1',
      contains: {
        type: 'bishop',
        color: 'white',
      },
      isActive: false,
    },
    d: {
      name: 'd1',
      contains: {
        type: 'queen',
        color: 'white',
      },
      isActive: false,
    },
    e: {
      name: 'e1',
      contains: {
        type: 'king',
        color: 'white',
      },
      isActive: false,
    },
    f: {
      name: 'f1',
      contains: {
        type: 'bishop',
        color: 'white',
      },
      isActive: false,
    },
    g: {
      name: 'g1',
      contains: {
        type: 'knight',
        color: 'white',
      },
      isActive: false,
    },
    h: {
      name: 'h1',
      contains: {
        type: 'rook',
        color: 'white',
      },
      isActive: false,
    },
  },
  2: {
    a: {
      name: 'a2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    b: {
      name: 'b2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    c: {
      name: 'c2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    d: {
      name: 'd2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    e: {
      name: 'e2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    f: {
      name: 'f2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    g: {
      name: 'g2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    h: {
      name: 'h2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
  },
  3: {
    a: {
      name: 'a3',
      contains: {
        type: null,
      },
    },
    b: {
      name: 'b3',
      contains: {
        type: null,
      },
    },
    c: {
      name: 'c3',
      contains: {
        type: null,
      },
    },
    d: {
      name: 'd3',
      contains: {
        type: null,
      },
    },
    e: {
      name: 'e3',
      contains: {
        type: null,
      },
    },
    f: {
      name: 'f3',
      contains: {
        type: null,
      },
    },
    g: {
      name: 'g3',
      contains: {
        type: null,
      },
    },
    h: {
      name: 'h3',
      contains: {
        type: null,
      },
    },
  },
  4: {
    a: {
      name: 'a4',
      contains: {
        type: null,
      },
    },
    b: {
      name: 'b4',
      contains: {
        type: null,
      },
    },
    c: {
      name: 'c4',
      contains: {
        type: null,
      },
    },
    d: {
      name: 'd4',
      contains: {
        type: null,
      },
    },
    e: {
      name: 'e4',
      contains: {
        type: null,
      },
    },
    f: {
      name: 'f4',
      contains: {
        type: null,
      },
    },
    g: {
      name: 'g4',
      contains: {
        type: null,
      },
    },
    h: {
      name: 'h4',
      contains: {
        type: null,
      },
    },
  },
  5: {
    a: {
      name: 'a5',
      contains: {
        type: null,
      },
    },
    b: {
      name: 'b5',
      contains: {
        type: null,
      },
    },
    c: {
      name: 'c5',
      contains: {
        type: null,
      },
    },
    d: {
      name: 'd5',
      contains: {
        type: null,
      },
    },
    e: {
      name: 'e5',
      contains: {
        type: null,
      },
    },
    f: {
      name: 'f5',
      contains: {
        type: null,
      },
    },
    g: {
      name: 'g5',
      contains: {
        type: null,
      },
    },
    h: {
      name: 'h5',
      contains: {
        type: null,
      },
    },
  },
  6: {
    a: {
      name: 'a6',
      contains: {
        type: null,
      },
    },
    b: {
      name: 'b6',
      contains: {
        type: null,
      },
    },
    c: {
      name: 'c6',
      contains: {
        type: null,
      },
    },
    d: {
      name: 'd6',
      contains: {
        type: null,
      },
    },
    e: {
      name: 'e6',
      contains: {
        type: null,
      },
    },
    f: {
      name: 'f6',
      contains: {
        type: null,
      },
    },
    g: {
      name: 'g6',
      contains: {
        type: null,
      },
    },
    h: {
      name: 'h6',
      contains: {
        type: null,
      },
    },
  },
  7: {
    a: {
      name: 'a7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    b: {
      name: 'b7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    c: {
      name: 'c7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    d: {
      name: 'd7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    e: {
      name: 'e7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    f: {
      name: 'f7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    g: {
      name: 'g7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    h: {
      name: 'h7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
  },
  8: {
    a: {
      name: 'a8',
      contains: {
        type: 'rook',
        color: 'black',
      },
      isActive: false,
    },
    b: {
      name: 'b8',
      contains: {
        type: 'knight',
        color: 'black',
      },
      isActive: false,
    },
    c: {
      name: 'c8',
      contains: {
        type: 'bishop',
        color: 'black',
      },
      isActive: false,
    },
    d: {
      name: 'd8',
      contains: {
        type: 'queen',
        color: 'black',
      },
      isActive: false,
    },
    e: {
      name: 'e8',
      contains: {
        type: 'king',
        color: 'black',
      },
      isActive: false,
    },
    f: {
      name: 'f8',
      contains: {
        type: 'bishop',
        color: 'black',
      },
      isActive: false,
    },
    g: {
      name: 'g8',
      contains: {
        type: 'knight',
        color: 'black',
      },
      isActive: false,
    },
    h: {
      name: 'h8',
      contains: {
        type: 'rook',
        color: 'black',
      },
      isActive: false,
    },
  },
};

const state = {
  cursor: 'idle',
  figure: null,
  turn: 'white',
};

const board = document.querySelector('.board');
const info = document.querySelector('.info');

const render = () => {
  info.textContent = `Ход ${state.turn === 'white' ? 'белых' : 'черных'}`
  Object.keys(matrix).forEach((row) => {
    Object.keys(matrix[row]).forEach((matrixCell) => {
      const domCell = document.querySelector(`[data-cell="${matrix[row][matrixCell].name}"]`);
      renderCell(matrix[row][matrixCell], domCell);
    });
  });
};

board.addEventListener('click', (e) => {
  switch (state.cursor) {
    case 'idle': {
      if (e.target.hasAttribute('alt')) {
        state.cursor = 'active';
        pickFigure(e, state, matrix)
      }
      break;
    }
    case 'active': {
      const activeCellName = e.target.alt 
        ? e.target.parentElement.dataset.cell 
        : e.target.dataset.cell
      const color = e.target.alt ? e.target.alt.split(' ')[0] : null;
      if (color === state.turn) {
        cleanEffects(matrix)
        pickFigure(e, state, matrix);        
        break;
      }
      const hasMoved = move(matrix, activeCellName, state.figure);
      if (hasMoved) {
        state.turn = state.turn === 'white' ? 'black' : 'white'
      }
      state.cursor = 'idle';
      cleanEffects(matrix);
      break;
    }
    default: {
      return null;
    }
  }

  render();
});

render();
