const getGameIsOverState = (board, state) => {
  const actionValue = 'finishGame';
  if (board.checkmate) {
    const result = state.isYourTurn ? 'loss' : 'win';
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result,
        reason: 'мат.',
      },
    });
    return { action };
  }
  if (board.stalemate) {
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result: 'draw',
        reason: 'пат.',
      },
    });
    return { action };
  }
  if (board.autoDraw) {
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result: 'draw',
        reason: 'недостаточно фигур для мата.',
      },
    });
    return { action };
  }
  if (board.fiftyMovesDraw) {
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result: 'draw',
        reason: 'правило 50 ходов.',
      },
    });
    return { action };
  }
  if (board.threeFold) {
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result: 'draw',
        reason: 'троекратное повторение позиции.',
      },
    });
    return { action };
  }
  return null;
};

export default getGameIsOverState;
