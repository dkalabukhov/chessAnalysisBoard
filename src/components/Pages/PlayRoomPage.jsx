import draw from '../../assets/images/chessTable/draw.png';
import surrender from '../../assets/images/chessTable/surrender.png';
import circle from '../../assets/images/chessTable/circle.svg';
import greenDot from '../../assets/images/chessTable/greenDot.svg';

const PlayRoomPage = () => (
  <>
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

export default PlayRoomPage;
