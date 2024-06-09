export default (pieces, pickFigureModal, figure) => {
  const [queen, bishop, knight, rook] = pieces;
  pickFigureModal.style.display = 'flex';

  if (figure.color === 'white') {
    queen.setAttribute('src', './assets/wQ.svg');
    bishop.setAttribute('src', './assets/wB.svg');
    knight.setAttribute('src', './assets/wN.svg');
    rook.setAttribute('src', './assets/wR.svg');
  } else {
    queen.setAttribute('src', './assets/bQ.svg');
    bishop.setAttribute('src', './assets/bB.svg');
    knight.setAttribute('src', './assets/bN.svg');
    rook.setAttribute('src', './assets/bR.svg');
  }
};
