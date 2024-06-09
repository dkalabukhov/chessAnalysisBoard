const createModalPiecesElements = (modalPieces) => {
  const queen = document.createElement('img');
  const bishop = document.createElement('img');
  const knight = document.createElement('img');
  const rook = document.createElement('img');
  queen.setAttribute('data-name', 'queen');
  bishop.setAttribute('data-name', 'bishop');
  knight.setAttribute('data-name', 'knight');
  rook.setAttribute('data-name', 'rook');
  modalPieces.append(queen, bishop, knight, rook);
  return [queen, bishop, knight, rook];
};

const renderModal = (pieces, pickFigureModal, figure) => {
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

export { createModalPiecesElements, renderModal };
