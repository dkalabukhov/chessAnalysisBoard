const renderMovesTable = (domTable, board) => {
  domTable.innerHTML = '';
  const keys = Object.keys(board.turnsHistory);
  keys.forEach((key) => {
    const { figure, move, turn } = board.turnsHistory[key];
    const { white, black } = move;
    const tr = document.createElement('tr');
    const turnNumber = document.createElement('td');
    const whiteMoveCell = document.createElement('td');
    const blackMoveCell = document.createElement('td');
    const whiteIcon = document.createElement('img');
    const blackIcon = document.createElement('img');
    switch (figure.white) {
      case 'pawn':
        whiteIcon.setAttribute('src', '../assets/wP.svg');
        break;
      case 'knight':
        whiteIcon.setAttribute('src', '../assets/wN.svg');
        break;
      case 'bishop':
        whiteIcon.setAttribute('src', '../assets/wB.svg');
        break;
      case 'rook':
        whiteIcon.setAttribute('src', '../assets/wR.svg');
        break;
      case 'queen':
        whiteIcon.setAttribute('src', '../assets/wQ.svg');
        break;
      case 'king':
        whiteIcon.setAttribute('src', '../assets/wK.svg');
        break;
      default:
        break;
    }
    switch (figure.black) {
      case 'pawn':
        blackIcon.setAttribute('src', '../assets/bP.svg');
        break;
      case 'knight':
        blackIcon.setAttribute('src', '../assets/bN.svg');
        break;
      case 'bishop':
        blackIcon.setAttribute('src', '../assets/bB.svg');
        break;
      case 'rook':
        blackIcon.setAttribute('src', '../assets/bR.svg');
        break;
      case 'queen':
        blackIcon.setAttribute('src', '../assets/bQ.svg');
        break;
      case 'king':
        blackIcon.setAttribute('src', '../assets/bK.svg');
        break;
      default:
        break;
    }
    turnNumber.textContent = turn;
    turnNumber.classList.add('table-secondary');
    whiteMoveCell.textContent = white;
    if (whiteMoveCell.textContent === '') {
      whiteMoveCell.textContent = '...';
    }
    if (figure.white) whiteMoveCell.prepend(whiteIcon);
    whiteMoveCell.classList.add('table-light');
    blackMoveCell.textContent = black;
    if (figure.black) blackMoveCell.prepend(blackIcon);
    blackMoveCell.classList.add('table-light');
    if (figure.white || figure.black) {
      tr.append(turnNumber, whiteMoveCell, blackMoveCell);
      domTable.append(tr);
    }
  });
};

export default renderMovesTable;
