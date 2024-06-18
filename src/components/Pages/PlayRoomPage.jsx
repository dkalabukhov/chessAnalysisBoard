/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect } from 'react';

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
import ResultsBlock from '../ui/ResultsBlock/ResultsBlock.jsx';

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

const PlayRoomPage = ({ leftBlock }) => {
  const { globalState } = useGlobal();

  const app = (connection) => {
    const domBoard = document.querySelector('.board');
    const beep = document.querySelector('.beep');
    const fenForm = document.querySelector('.fen__form');
    const fenInput = document.querySelector('.fen__input');
    const domTable = document.querySelector('tbody');
    const pickFigureModal = document.querySelector('.pickFigureModal');
    const modalPieces = document.querySelector('.pickFigureModal__pieces');
    const modalPiecesElements = createModalPiecesElements(modalPieces);
    const boardRows = document.querySelectorAll('.board__row');

    console.log('app() loading >> globalState: ', globalState);
    const state = {
      cursor: 'idle',
      figure: null,
      turn: globalState.activeSide,
      isYourTurn: globalState.isYourTurn,
      gameIsOver: false,
      yourSide: globalState.side,
    };

    const initFEN = globalState.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const board = new ChessBoard(initFEN);
    board.setPlayerSide(globalState.side);
    if (globalState.side === 'black') reverseBoard(boardRows);
    if (globalState.turnsHistory) board.setNewTurnsHistory(globalState.turnsHistory);

    const render = () => {
      if (board.pawnPromotion) {
        renderModal(modalPiecesElements, pickFigureModal, board.pawnPromotion);
      }
      const gameIsOverState = getGameIsOverState(board, state);
      if (gameIsOverState) {
        state.gameIsOver = true;
        if (!board.isSpectator()) connection.send(gameIsOverState.action);
      }
      board.cellNames.forEach((name) => {
        const domCell = document.querySelector(`[data-cell="${name}"]`);
        renderCell(board.cellByName(name), domCell);
      });
      // roll back!
      fenInput.value = board.fenString;
    };

    connection.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      switch (data.action) {
        case 'gameState':
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
          state.isYourTurn = data.payload.isYourTurn;
          break;
        case 'gameEnded':
          state.gameIsOver = true;
          break;
        default:
          // console.log('NEW unwatchable server message: ', data);
          break;
      }
    });

    domBoard.addEventListener('click', (e) => {
      if (!state.isYourTurn || state.gameIsOver || globalState.result) return;
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
      if (!state.isYourTurn || state.gameIsOver || globalState.result) return;
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

    render();
    beep.play();
    renderMovesTable(domTable, board);
  };

  useEffect(() => {
    if (appIsLoaded) return;
    const connection = globalState.websocket;
    if (globalState.result) {
      console.log('playpage Reload: GAME IS OVER!!!');
      app(connection);
      appIsLoaded = true;
      return;
    }
    if (isLoadedAllProps(globalState)) {
      console.log('Loading PlayPage app()');
      app(connection);
      appIsLoaded = true;
    }
  });

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      <TopPlayer />
      <div className="wrapper">
        {leftBlock === 'game' && <InfoBlock />}
        {leftBlock === 'results' && <ResultsBlock />}
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
