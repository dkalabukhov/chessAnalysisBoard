import { useEffect } from 'react';

// import circle from '../../assets/images/chessTable/circle.svg';

import FenParser from '../modules/GameLogic/controllers/fenParser.js';
import renderCell from '../modules/GameLogic/renders/renderCell.js';
import { createModalPiecesElements, renderModal } from '../modules/GameLogic/renders/renderModal.js';
import renderMovesTable from '../modules/GameLogic/renders/renderMovesTable.js';
import pickFigure from '../modules/GameLogic/controllers/pickFigure.js';
import ChessBoard from '../modules/GameLogic/classes/chessBoard.js';
import reverseBoard from '../modules/GameLogic/renders/reverseBoard.js';
import getGameIsOverState from '../modules/GameLogic/controllers/getGameIsOverState.js';

import useGlobal from '../../services/useGlobal.js';
import Board from './Board.jsx';
import TopPlayer from './TopPlayer.jsx';
import InfoBlock from '../ui/InfoBlock/InfoBlock.jsx';

let appIsLoaded = false;

const isLoadedAllProps = (globalState) => {
  if (globalState.activeSide === undefined) return false;
  if (globalState.isYourTurn === undefined) return false;
  if (globalState.side === undefined) return false;
  if (globalState.whitePlayerName === undefined) return false;
  if (globalState.blackPlayerName === undefined) return false;
  if (globalState.websocket === undefined) return false;
  return true;
};

const PlayRoomPage = () => {
  const { globalState } = useGlobal();

  const app = (connection) => {
    const domBoard = document.querySelector('.board');
    // const turn = document.querySelector('.info__status');
    // const reason = document.querySelector('.info__reason');
    // const whiteIcon = document.querySelector('.white-icon');
    // const blackIcon = document.querySelector('.black-icon');
    const beep = document.querySelector('.beep');
    const fenForm = document.querySelector('.fen__form');
    const fenInput = document.querySelector('.fen__input');
    const domTable = document.querySelector('tbody');
    // const boardFEN = document.querySelector('.board__fen');
    const pickFigureModal = document.querySelector('.pickFigureModal');
    const modalPieces = document.querySelector('.pickFigureModal__pieces');
    const modalPiecesElements = createModalPiecesElements(modalPieces);
    const boardRows = document.querySelectorAll('.board__row');
    const surrenderButton = document.querySelector('#surrender');
    const proposeDrawButton = document.querySelector('#propose_draw');

    console.log('app() loading >> globalState: ', globalState);
    const state = {
      cursor: 'idle',
      figure: null,
      turn: globalState.activeSide,
      activePlayer: globalState.activePlayer, // НАМ ЕЩЕ НУЖНО ЭТО СВОЙСТВО???
      isYourTurn: globalState.isYourTurn,
      gameStarted: true,
      gameIsOver: false,
      yourSide: globalState.side,
    };

    const initFEN = globalState.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const board = new ChessBoard(initFEN);
    board.setPlayerSide(globalState.side);
    if (globalState.side === 'black') reverseBoard(boardRows);
    if (globalState.turnsHistory) board.setNewTurnsHistory(globalState.turnsHistory);

    // document.querySelector('.whitePlayer').textContent = globalState.whitePlayerName;
    // document.querySelector('.blackPlayer').textContent = globalState.blackPlayerName;
    // const whitePlayerFiled = document.querySelector('.whitePlayer');
    // const blackPlayerFiled = document.querySelector('.blackPlayer');

    const render = () => {
      // whitePlayerFiled.textContent = globalState.whitePlayerName;
      // blackPlayerFiled.textContent = globalState.blackPlayerName;
      // document.querySelector('.whitePlayer').textContent = globalState.whitePlayerName;
      // document.querySelector('.blackPlayer').textContent = globalState.blackPlayerName;

      if (board.pawnPromotion) {
        renderModal(modalPiecesElements, pickFigureModal, board.pawnPromotion);
      }
      const gameIsOverState = getGameIsOverState(board, state);
      // if (gameIsOverState) {
      //   state.gameIsOver = true;
      //   turn.textContent = gameIsOverState.turnContext;
      //   reason.textContent = gameIsOverState.reasonContext;
      //   console.log(`${gameIsOverState.turnContext}. Причина: ${gameIsOverState.reasonContext}`);
      //   if (!board.isSpectator()) connection.send(gameIsOverState.action);
      // } else {
      //   turn.textContent = `Ход ${state.turn === 'white' ? 'белых' : 'черных'}`;
      // }
      // if (state.gameStarted) {
      //   blackIcon.setAttribute('src', '../assets/greenDot.svg');
      // }
      board.cellNames.forEach((name) => {
        const domCell = document.querySelector(`[data-cell="${name}"]`);
        renderCell(board.cellByName(name), domCell);
      });
      fenInput.value = board.fenString;
    };

    connection.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      switch (data.action) {
        case 'gameState':
          // console.log('gameState MES: ', data);
          if (data.payload.turnsHistory) {
            board.turnsHistory = data.payload.turnsHistory;
            renderMovesTable(domTable, board);
          }
          board.loadFen(data.payload.fen);
          state.cursor = 'idle';
          state.figure = null;
          render();
          break;
        case 'turnState':
          state.turn = data.payload.activeSide;
          state.activePlayer = data.payload.activePlayer;
          state.isYourTurn = data.payload.isYourTurn;
          state.gameStarted = true;
          break;
        case 'drawProposal':
          // eslint-disable-next-line no-alert
          alert('Соперник предлагает ничью!');
          break;
        case 'winProposal':
          // eslint-disable-next-line no-alert
          if (data.payload.ableToDeclareWin) {
            // eslint-disable-next-line no-alert
            // alert('Соперник давно в оффлайне - ты можешь требовать победу!');
          } else {
            // eslint-disable-next-line no-alert
            // alert('про... ты свое счастье.......');
          }
          break;
        default:
          console.log('NEW unwatchable server message: ', data);
          break;
      }
    });

    domBoard.addEventListener('click', (e) => {
      if (!state.isYourTurn || state.gameIsOver) return;
      switch (state.cursor) {
        case 'idle': {
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
      if (!state.isYourTurn || state.gameIsOver) return;
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

    surrenderButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (board.isSpectator()) return;
      const action = JSON.stringify({
        action: 'finishGame',
        payload: {
          result: 'loss',
          reason: `${board.getPlayerSide() === 'white' ? 'Белые' : 'Черные'} сдались`,
        },
      });
      connection.send(action);
    });

    proposeDrawButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (board.isSpectator()) return;
      console.log('you propose draw!');
      const action = JSON.stringify({ action: 'proposeDraw', payload: null });
      connection.send(action);
    });

    render();
    beep.play();
    renderMovesTable(domTable, board);
  };

  useEffect(() => {
    if (appIsLoaded) return;
    if (!isLoadedAllProps(globalState)) return;
    const connection = globalState.websocket;
    console.log('Loading PlayPage app()');
    app(connection);
    appIsLoaded = true;
  });

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      <TopPlayer />
      <div className="wrapper">

        <InfoBlock />

        <Board />

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
      <audio src="../assets/beep.mp3" className="beep" />
    </>
  );
};

export default PlayRoomPage;
