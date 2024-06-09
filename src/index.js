import FenParser from './controllers/fenParser.js';
import renderCell from './renders/renderCell.js';
import { createModalPiecesElements, renderModal } from './renders/renderModal.js';
import renderMovesTable from './renders/renderMovesTable.js';
import pickFigure from './controllers/pickFigure.js';
import ChessBoard from './classes/chessBoard.js';
import quickConnection from './quickConnection.js';

const app = (connection) => {
  const domBoard = document.querySelector('.board');
  const turn = document.querySelector('.info__turn');
  const fenForm = document.querySelector('.fen__form');
  const fenInput = document.querySelector('.fen__input');
  const domTable = document.querySelector('tbody');
  const boardFEN = document.querySelector('.board__fen');
  const pickFigureModal = document.querySelector('.pickFigureModal');
  const modalPieces = document.querySelector('.pickFigureModal__pieces');
  const modalPiecesElements = createModalPiecesElements(modalPieces);

  const state = {
    cursor: 'idle',
    figure: null,
    turn: 'white',
    activePlayer: '',
    isYourTurn: false,
  };

  const initFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const board = new ChessBoard(initFEN);

  const render = () => {
    if (board.pawnPromotion) {
      renderModal(modalPiecesElements, pickFigureModal, board.pawnPromotion);
    }
    if (board.checkmate) {
      turn.classList.add('incheck');
      turn.textContent = `Королю ${state.turn === 'white' ? 'белых' : 'черных'} МАТ!`;
    } else if (board.stalemate) {
      turn.classList.add('incheck');
      turn.textContent = 'ПАТ!';
    } else if (board.autoDraw) {
      turn.classList.add('incheck');
      turn.textContent = 'Боевая НИЧЬЯ!';
      // } else turn.textContent = `Ход ${state.turn === 'white' ? 'белых' : 'черных'}`;
    } else {
      turn.classList.remove('incheck');
      const name = state.activePlayer;
      const yourTurn = state.isYourTurn ? ' (твой ход)' : '';
      turn.textContent = `Ход: ${name} (${state.turn})${yourTurn}`;
    }
    board.cellNames.forEach((name) => {
      const domCell = document.querySelector(`[data-cell="${name}"]`);
      renderCell(board.cellByName(name), domCell);
    });
    boardFEN.textContent = board.fenString;
  };

  connection.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.action) {
      case 'yourSide':
        board.setPlayerSide(data.payload.side);
        break;
      case 'gameState':
        // console.log('new fen from server received!');
        board.loadFen(data.payload.fen);
        state.cursor = 'idle';
        state.figure = null;
        break;
      case 'turnState':
        state.turn = data.payload.activeSide;
        state.activePlayer = data.payload.activePlayer;
        state.isYourTurn = data.payload.isYourTurn;
        render();
        break;
      default:
        // console.log('connection.onmessage: new unwatcheble server message');
        break;
    }
    // console.log(data);
  };

  domBoard.addEventListener('click', (e) => {
    if (!state.isYourTurn) return;
    switch (state.cursor) {
      case 'idle': {
        // console.log('domBoard click event: state.cursor = idle');
        if (e.target.hasAttribute('alt')) {
          const activeCellName = e.target.parentElement.dataset.cell;
          const activeCell = board.cellByName(activeCellName);
          if (activeCell.figure.color === state.turn) {
            state.figure = activeCellName;
            state.cursor = 'active';
            pickFigure(activeCell, board);
          }
        }
        break;
      }
      case 'active': {
        // console.log('domBoard click event: state.cursor = active');
        const targetCellName = e.target.alt
          ? e.target.parentElement.dataset.cell
          : e.target.dataset.cell;
        const targetCell = board.cellByName(targetCellName);
        if (targetCell.figure && targetCell.figure.color === state.turn) {
          board.cleanEffects();
          state.figure = targetCellName;
          pickFigure(targetCell, board);
          targetCell.isActive = true;
          break;
        }
        const hasMoved = board.moveFigure(board.cellByName(state.figure), targetCell);
        if (hasMoved && !board.pawnPromotion) {
          renderMovesTable(domTable, board);
          board.makeTurn();
          connection.send(
            JSON.stringify({
              action: 'makeTurn',
              payload: {
                fen: board.fenString,
              },
            }),
          );
        }
        state.cursor = 'idle';
        board.cleanEffects();
        break;
      }
      default: {
        return null;
      }
    }

    render();
  });

  fenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.isYourTurn) return;
    const fenString = fenInput.value.trim();
    if (!FenParser.isFen(fenString)) {
      // eslint-disable-next-line no-alert
      alert('Неверный FEN!');
    } else {
      board.loadFen(fenString);
      if (state.turn !== board.currentTurnColor) {
        connection.send(
          JSON.stringify({
            action: 'makeTurn',
            payload: {
              fen: fenString,
            },
          }),
        );
      }
      // state.turn = board.currentTurnColor;
      state.cursor = 'idle';
      state.figure = null;
      renderMovesTable(domTable, board);
      render();
    }
  });

  modalPiecesElements.forEach((piece) => {
    piece.classList.add('pickFigureModal__piece');
    piece.addEventListener('click', (e) => {
      pickFigureModal.style.display = 'none';
      board.pawnPromotion.type = e.target.dataset.name;
      board.pawnPromotion = null;
      renderMovesTable(domTable, board);
      board.makeTurn();
      connection.send(
        JSON.stringify({
          action: 'makeTurn',
          payload: {
            fen: board.fenString,
          },
        }),
      );
      render();
    });
  });

  render();
};

// eslint-disable-next-line func-names
quickConnection().then((connection) => app(connection));
