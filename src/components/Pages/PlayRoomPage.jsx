import { useEffect } from 'react';
import draw from '../../assets/images/chessTable/draw.png';
import surrender from '../../assets/images/chessTable/surrender.png';
import circle from '../../assets/images/chessTable/circle.svg';
import greenDot from '../../assets/images/chessTable/greenDot.svg';
import FenParser from './controllers/fenParser.js';
import renderCell from './renders/renderCell.js';
import { createModalPiecesElements, renderModal } from './renders/renderModal.js';
import renderMovesTable from './renders/renderMovesTable.js';
import pickFigure from './controllers/pickFigure.js';
import ChessBoard from './classes/chessBoard.js';
import quickConnection from './quickConnection.js';
import reverseBoard from './renders/reverseBoard.js';

const PlayRoomPage = () => {
  const app = (connection) => {
    const domBoard = document.querySelector('.board');
    const turn = document.querySelector('.info__status');
    const reason = document.querySelector('.info__reason');
    // const whiteIcon = document.querySelector('.white-icon');
    const blackIcon = document.querySelector('.black-icon');
    // const beep = document.querySelector('#beep');
    const fenForm = document.querySelector('.fen__form');
    const fenInput = document.querySelector('.fen__input');
    const domTable = document.querySelector('tbody');
    const boardFEN = document.querySelector('.board__fen');
    const pickFigureModal = document.querySelector('.pickFigureModal');
    const modalPieces = document.querySelector('.pickFigureModal__pieces');
    const modalPiecesElements = createModalPiecesElements(modalPieces);
    const boardRows = document.querySelectorAll('.board__row');

    const state = {
      cursor: 'idle',
      figure: null,
      turn: 'white',
      activePlayer: '',
      isYourTurn: false,
      gameStarted: false,
    };

    const initFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // нужно поправить en passant
    const board = new ChessBoard(initFEN);

    const render = () => {
      if (board.pawnPromotion) {
        renderModal(modalPiecesElements, pickFigureModal, board.pawnPromotion);
      }
      if (board.checkmate) {
        turn.textContent = `${state.turn === 'white' ? 'Черные' : 'Белые'} победили`;
        reason.textContent = 'Мат';
      } else if (board.stalemate) {
        turn.textContent = 'Ничья';
        reason.textContent = 'Пат';
      } else if (board.autoDraw) {
        turn.textContent = 'Ничья';
        reason.textContent = 'Недостаточно фигур для мата';
        // } else turn.textContent = `Ход ${state.turn === 'white' ? 'белых' : 'черных'}`;
      } else if (board.fiftyMovesDraw) {
        turn.textContent = 'Ничья';
        reason.textContent = 'Ничья по правилу 50 ходов';
      } else if (board.threeFold) {
        turn.textContent = 'Ничья';
        reason.textContent = 'Троекратное повторение позиции';
      } else {
        // turn.classList.remove('incheck');
        // const name = state.activePlayer;
        // const yourTurn = state.isYourTurn ? ' (твой ход)' : '';
        // turn.textContent = `Ход: ${name} (${state.turn})${yourTurn}`;
        turn.textContent = `Ход ${state.turn === 'white' ? 'белых' : 'черных'}`;
      }
      if (state.gameStarted) {
        blackIcon.setAttribute('src', '../assets/greenDot.svg');
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
          if (data.payload.side === 'black') reverseBoard(boardRows);
          break;
        case 'gameState':
          // console.log('new fen from server received!');
          if (data.payload.turnsHistory) {
            board.turnsHistory = data.payload.turnsHistory;
            renderMovesTable(domTable, board);
            // console.log('Received history: ', board.turnsHistory);
          } // else console.log('nothing,,,');
          board.loadFen(data.payload.fen);
          state.cursor = 'idle';
          state.figure = null;
          break;
        case 'turnState':
          state.turn = data.payload.activeSide;
          state.activePlayer = data.payload.activePlayer;
          state.isYourTurn = data.payload.isYourTurn;
          state.gameStarted = true;
          // beep.loop = false;
          // beep.play();
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
                  turnsHistory: board.turnsHistory,
                },
              }),
            );
          }
          state.cursor = 'idle';
          board.cleanEffects();
          break;
        }
        default: {
          break;
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
        board.clearPositionsArray();
        board.loadFen(fenString);
        board.turnsHistory = {};
        board.makeEmptyHistoryTurn();
        if (state.turn !== board.currentTurnColor) {
          connection.send(
            JSON.stringify({
              action: 'makeTurn',
              payload: {
                fen: fenString,
                turnsHistory: board.turnsHistory,
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
        const newFigureType = e.target.dataset.name;
        board.pawnPromotion.type = newFigureType;
        board.pawnPromotion = null;
        board.addPawnPromotionToHistory(newFigureType);
        renderMovesTable(domTable, board);
        board.makeTurn();
        connection.send(
          JSON.stringify({
            action: 'makeTurn',
            payload: {
              fen: board.fenString,
              turnsHistory: board.turnsHistory,
            },
          }),
        );
        render();
      });
    });

    render();
  };

  useEffect(() => {
    // eslint-disable-next-line func-names
    quickConnection().then((connection) => app(connection));
  });

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      <div className="wrapper">
        <div className="info">
          <div className="info__player_white">
            <h3 className="info__heading whitePlayer">White Player</h3>
            <img
              src={greenDot}
              className="info__icon white-icon"
              alt=""
              srcSet=""
            />
          </div>
          <h3 className="info__status">Ход белых</h3>
          <span className="info__reason" />
          <form className="info__form">
            <button type="button" className="info__btn draw" title="Предложить ничью">
              <img src={draw} alt="Предложить ничью" srcSet="" />
            </button>
            <button type="button" className="info__btn surrender" title="Сдаться">
              <img src={surrender} alt="Сдаться" srcSet="" />
            </button>
          </form>
          <div className="info__player_black">
            <h3 className="info__heading blackPlayer">Black Player</h3>
            <img
              src={circle}
              className="info__icon black-icon"
              alt=""
              srcSet=""
            />
          </div>
        </div>
        <div className="board">
          <div className="board__row" data-row={8}>
            <div className="cell" data-cell="a8" />
            <div className="cell" data-cell="b8" />
            <div className="cell" data-cell="c8" />
            <div className="cell" data-cell="d8" />
            <div className="cell" data-cell="e8" />
            <div className="cell" data-cell="f8" />
            <div className="cell" data-cell="g8" />
            <div className="cell" data-cell="h8" />
          </div>
          <div className="board__row" data-row={7}>
            <div className="cell" data-cell="a7" />
            <div className="cell" data-cell="b7" />
            <div className="cell" data-cell="c7" />
            <div className="cell" data-cell="d7" />
            <div className="cell" data-cell="e7" />
            <div className="cell" data-cell="f7" />
            <div className="cell" data-cell="g7" />
            <div className="cell" data-cell="h7" />
          </div>
          <div className="board__row" data-row={6}>
            <div className="cell" data-cell="a6" />
            <div className="cell" data-cell="b6" />
            <div className="cell" data-cell="c6" />
            <div className="cell" data-cell="d6" />
            <div className="cell" data-cell="e6" />
            <div className="cell" data-cell="f6" />
            <div className="cell" data-cell="g6" />
            <div className="cell" data-cell="h6" />
          </div>
          <div className="board__row" data-row={5}>
            <div className="cell" data-cell="a5" />
            <div className="cell" data-cell="b5" />
            <div className="cell" data-cell="c5" />
            <div className="cell" data-cell="d5" />
            <div className="cell" data-cell="e5" />
            <div className="cell" data-cell="f5" />
            <div className="cell" data-cell="g5" />
            <div className="cell" data-cell="h5" />
          </div>
          <div className="board__row" data-row={4}>
            <div className="cell" data-cell="a4" />
            <div className="cell" data-cell="b4" />
            <div className="cell" data-cell="c4" />
            <div className="cell" data-cell="d4" />
            <div className="cell" data-cell="e4" />
            <div className="cell" data-cell="f4" />
            <div className="cell" data-cell="g4" />
            <div className="cell" data-cell="h4" />
          </div>
          <div className="board__row" data-row={3}>
            <div className="cell" data-cell="a3" />
            <div className="cell" data-cell="b3" />
            <div className="cell" data-cell="c3" />
            <div className="cell" data-cell="d3" />
            <div className="cell" data-cell="e3" />
            <div className="cell" data-cell="f3" />
            <div className="cell" data-cell="g3" />
            <div className="cell" data-cell="h3" />
          </div>
          <div className="board__row" data-row={2}>
            <div className="cell" data-cell="a2" />
            <div className="cell" data-cell="b2" />
            <div className="cell" data-cell="c2" />
            <div className="cell" data-cell="d2" />
            <div className="cell" data-cell="e2" />
            <div className="cell" data-cell="f2" />
            <div className="cell" data-cell="g2" />
            <div className="cell" data-cell="h2" />
          </div>
          <div className="board__row" data-row={1}>
            <div className="cell" data-cell="a1" />
            <div className="cell" data-cell="b1" />
            <div className="cell" data-cell="c1" />
            <div className="cell" data-cell="d1" />
            <div className="cell" data-cell="e1" />
            <div className="cell" data-cell="f1" />
            <div className="cell" data-cell="g1" />
            <div className="cell" data-cell="h1" />
          </div>
          <div className="fen">
            <form className="fen__form">
              <h3 className="fen__heading">FEN</h3>
              <input type="text" className="fen__input" />
              <button type="submit" className="fen__btn">Загрузить</button>
              <h3 className="fen__heading">Board FEN: </h3>
              <span className="board__fen" />
            </form>
          </div>
        </div>
        <div className="moves">
          <h5 className="moves__heading">История ходов:</h5>
          <table className="table table-hover">
            <tbody />
          </table>
        </div>
      </div>
      <div className="pickFigureModal">
        <div className="pickFigureModal__content">
          <h3 className="pickFigureModal__heading">Выберите фигуру:</h3>
          <div className="pickFigureModal__pieces" />
        </div>
      </div>
    </>
  );
};

export default PlayRoomPage;
