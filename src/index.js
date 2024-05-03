import getAvailableCells from './getAvailableCells.js';
import renderCell from './renderCell.js';
import removeAvailableMoves from './removeAvailableMoves.js';
import removeActiveStatus from './removeActiveStatus.js';

const matrix = [
  [
    {
      name: 'a1',
      contains: {
        type: 'rook',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'b1',
      contains: {
        type: 'knight',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'c1',
      contains: {
        type: 'bishop',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'd1',
      contains: {
        type: 'queen',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'e1',
      contains: {
        type: 'king',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'f1',
      contains: {
        type: 'bishop',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'g1',
      contains: {
        type: 'knight',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'h1',
      contains: {
        type: 'rook',
        color: 'white',
      },
      isActive: false,
    },
  ],
  [
    {
      name: 'a2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'b2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'c2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'd2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'e2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'f2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'g2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
    {
      name: 'h2',
      contains: {
        type: 'pawn',
        color: 'white',
      },
      isActive: false,
    },
  ],
  [
    {
      name: 'a3',
      contains: {
        type: null,
      },
    },
    {
      name: 'b3',
      contains: {
        type: null,
      },
    },
    {
      name: 'c3',
      contains: {
        type: null,
      },
    },
    {
      name: 'd3',
      contains: {
        type: null,
      },
    },
    {
      name: 'e3',
      contains: {
        type: null,
      },
    },
    {
      name: 'f3',
      contains: {
        type: null,
      },
    },
    {
      name: 'g3',
      contains: {
        type: null,
      },
    },
    {
      name: 'h3',
      contains: {
        type: null,
      },
    },
  ],
  [
    {
      name: 'a4',
      contains: {
        type: null,
      },
    },
    {
      name: 'b4',
      contains: {
        type: null,
      },
    },
    {
      name: 'c4',
      contains: {
        type: null,
      },
    },
    {
      name: 'd4',
      contains: {
        type: null,
      },
    },
    {
      name: 'e4',
      contains: {
        type: null,
      },
    },
    {
      name: 'f4',
      contains: {
        type: null,
      },
    },
    {
      name: 'g4',
      contains: {
        type: null,
      },
    },
    {
      name: 'h4',
      contains: {
        type: null,
      },
    },
  ],
  [
    {
      name: 'a5',
      contains: {
        type: null,
      },
    },
    {
      name: 'b5',
      contains: {
        type: null,
      },
    },
    {
      name: 'c5',
      contains: {
        type: null,
      },
    },
    {
      name: 'd5',
      contains: {
        type: null,
      },
    },
    {
      name: 'e5',
      contains: {
        type: null,
      },
    },
    {
      name: 'f5',
      contains: {
        type: null,
      },
    },
    {
      name: 'g5',
      contains: {
        type: null,
      },
    },
    {
      name: 'h5',
      contains: {
        type: null,
      },
    },
  ],
  [
    {
      name: 'a6',
      contains: {
        type: null,
      },
    },
    {
      name: 'b6',
      contains: {
        type: null,
      },
    },
    {
      name: 'c6',
      contains: {
        type: null,
      },
    },
    {
      name: 'd6',
      contains: {
        type: null,
      },
    },
    {
      name: 'e6',
      contains: {
        type: null,
      },
    },
    {
      name: 'f6',
      contains: {
        type: null,
      },
    },
    {
      name: 'g6',
      contains: {
        type: null,
      },
    },
    {
      name: 'h6',
      contains: {
        type: null,
      },
    },
  ],
  [
    {
      name: 'a7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'b7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'c7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'd7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'e7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'f7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'g7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'h7',
      contains: {
        type: 'pawn',
        color: 'black',
      },
      isActive: false,
    },
  ],
  [
    {
      name: 'a8',
      contains: {
        type: 'rook',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'b8',
      contains: {
        type: 'knight',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'c8',
      contains: {
        type: 'bishop',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'd8',
      contains: {
        type: 'queen',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'e8',
      contains: {
        type: 'king',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'f8',
      contains: {
        type: 'bishop',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'g8',
      contains: {
        type: 'knight',
        color: 'black',
      },
      isActive: false,
    },
    {
      name: 'h8',
      contains: {
        type: 'rook',
        color: 'black',
      },
      isActive: false,
    },
  ],
];

const board = document.querySelector('.board');

const render = () => {
  matrix.forEach((row) => {
    row.forEach((matrixCell) => {
      const domCell = document.querySelector(`[data-cell="${matrixCell.name}"]`);
      renderCell(matrixCell, domCell);
    });
  });
};

board.addEventListener('click', (e) => {
  removeAvailableMoves(matrix);
  removeActiveStatus(matrix);
  if (e.target.hasAttribute('alt')) {
    const cellItem = e.target.parentElement;
    const activeCellName = cellItem.dataset.cell;
    const availableCells = getAvailableCells(e.target, matrix);
    matrix.forEach((row) => {
      row.forEach((cell) => {
        if (availableCells.includes(cell.name)) {
          if (!cell.contains.type) {
            cell.contains = { type: 'dot' };
          }
        }
        if (cell.name === activeCellName) {
          cell.isActive = true;
        }
      });
    });
  }
  render();
});

render();
