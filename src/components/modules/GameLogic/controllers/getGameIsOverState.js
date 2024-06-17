const getGameIsOverState = (board, state) => {
  const actionValue = 'finishGame';
  if (board.checkmate) {
    const turnContext = `${state.turn === 'white' ? 'Черные' : 'Белые'} победили`;
    const reasonContext = 'Мат';
    const result = state.isYourTurn ? 'loss' : 'win';
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result,
        reason: 'мат.',
      },
    });
    return { turnContext, reasonContext, action };
  }
  if (board.stalemate) {
    const turnContext = 'Ничья';
    const reasonContext = 'Пат';
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result: 'draw',
        reason: 'пат.',
      },
    });
    return { turnContext, reasonContext, action };
  }
  if (board.autoDraw) {
    const turnContext = 'Ничья';
    const reasonContext = 'Недостаточно фигур для мата';
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result: 'draw',
        reason: 'недостаточно фигур для мата.',
      },
    });
    return { turnContext, reasonContext, action };
  }
  if (board.fiftyMovesDraw) {
    const turnContext = 'Ничья';
    const reasonContext = 'Ничья по правилу 50 ходов';
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result: 'draw',
        reason: 'правило 50 ходов.',
      },
    });
    return { turnContext, reasonContext, action };
  }
  if (board.threeFold) {
    const turnContext = 'Ничья';
    const reasonContext = 'Троекратное повторение позиции';
    const action = JSON.stringify({
      action: actionValue,
      payload: {
        result: 'draw',
        reason: 'троекратное повторение позиции.',
      },
    });
    return { turnContext, reasonContext, action };
  }

  return null;
};

export default getGameIsOverState;
