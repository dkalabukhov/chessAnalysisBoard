const Board = () => (
  <div className="board">
    <div className="board__row" data-row={9}>
      <div className="empty-cell" data-cell="top-empty" />
      <div className="xA-cell" data-cell="top-a">a</div>
      <div className="xA-cell" data-cell="top-a">b</div>
      <div className="xA-cell" data-cell="top-a">c</div>
      <div className="xA-cell" data-cell="top-a">d</div>
      <div className="xA-cell" data-cell="top-a">e</div>
      <div className="xA-cell" data-cell="top-a">f</div>
      <div className="xA-cell" data-cell="top-a">g</div>
      <div className="xA-cell" data-cell="top-a">h</div>
      <div className="empty-cell" data-cell="top-empty" />
    </div>
    <div className="board__row" data-row={8}>
      <div className="x1-cell" data-cell="left-8">8</div>
      <div className="cell" data-cell="a8" />
      <div className="cell" data-cell="b8" />
      <div className="cell" data-cell="c8" />
      <div className="cell" data-cell="d8" />
      <div className="cell" data-cell="e8" />
      <div className="cell" data-cell="f8" />
      <div className="cell" data-cell="g8" />
      <div className="cell" data-cell="h8" />
      <div className="x1-cell" data-cell="right-8">8</div>
    </div>
    <div className="board__row" data-row={7}>
      <div className="x1-cell" data-cell="left-7">7</div>
      <div className="cell" data-cell="a7" />
      <div className="cell" data-cell="b7" />
      <div className="cell" data-cell="c7" />
      <div className="cell" data-cell="d7" />
      <div className="cell" data-cell="e7" />
      <div className="cell" data-cell="f7" />
      <div className="cell" data-cell="g7" />
      <div className="cell" data-cell="h7" />
      <div className="x1-cell" data-cell="right-7">7</div>
    </div>
    <div className="board__row" data-row={6}>
      <div className="x1-cell" data-cell="left-6">6</div>
      <div className="cell" data-cell="a6" />
      <div className="cell" data-cell="b6" />
      <div className="cell" data-cell="c6" />
      <div className="cell" data-cell="d6" />
      <div className="cell" data-cell="e6" />
      <div className="cell" data-cell="f6" />
      <div className="cell" data-cell="g6" />
      <div className="cell" data-cell="h6" />
      <div className="x1-cell" data-cell="right-6">6</div>
    </div>
    <div className="board__row" data-row={5}>
      <div className="x1-cell" data-cell="left-5">5</div>
      <div className="cell" data-cell="a5" />
      <div className="cell" data-cell="b5" />
      <div className="cell" data-cell="c5" />
      <div className="cell" data-cell="d5" />
      <div className="cell" data-cell="e5" />
      <div className="cell" data-cell="f5" />
      <div className="cell" data-cell="g5" />
      <div className="cell" data-cell="h5" />
      <div className="x1-cell" data-cell="right-5">5</div>
    </div>
    <div className="board__row" data-row={4}>
      <div className="x1-cell" data-cell="left-4">4</div>
      <div className="cell" data-cell="a4" />
      <div className="cell" data-cell="b4" />
      <div className="cell" data-cell="c4" />
      <div className="cell" data-cell="d4" />
      <div className="cell" data-cell="e4" />
      <div className="cell" data-cell="f4" />
      <div className="cell" data-cell="g4" />
      <div className="cell" data-cell="h4" />
      <div className="x1-cell" data-cell="right-4">4</div>
    </div>
    <div className="board__row" data-row={3}>
      <div className="x1-cell" data-cell="left-3">3</div>
      <div className="cell" data-cell="a3" />
      <div className="cell" data-cell="b3" />
      <div className="cell" data-cell="c3" />
      <div className="cell" data-cell="d3" />
      <div className="cell" data-cell="e3" />
      <div className="cell" data-cell="f3" />
      <div className="cell" data-cell="g3" />
      <div className="cell" data-cell="h3" />
      <div className="x1-cell" data-cell="right-3">3</div>
    </div>
    <div className="board__row" data-row={2}>
      <div className="x1-cell" data-cell="left-2">2</div>
      <div className="cell" data-cell="a2" />
      <div className="cell" data-cell="b2" />
      <div className="cell" data-cell="c2" />
      <div className="cell" data-cell="d2" />
      <div className="cell" data-cell="e2" />
      <div className="cell" data-cell="f2" />
      <div className="cell" data-cell="g2" />
      <div className="cell" data-cell="h2" />
      <div className="x1-cell" data-cell="right-2">2</div>
    </div>
    <div className="board__row" data-row={1}>
      <div className="x1-cell" data-cell="left-1">1</div>
      <div className="cell" data-cell="a1" />
      <div className="cell" data-cell="b1" />
      <div className="cell" data-cell="c1" />
      <div className="cell" data-cell="d1" />
      <div className="cell" data-cell="e1" />
      <div className="cell" data-cell="f1" />
      <div className="cell" data-cell="g1" />
      <div className="cell" data-cell="h1" />
      <div className="x1-cell" data-cell="right-1">1</div>
    </div>
    <div className="board__row" data-row={0}>
      <div className="empty-cell" data-cell="top-empty" />
      <div className="xA-cell" data-cell="top-a">a</div>
      <div className="xA-cell" data-cell="top-a">b</div>
      <div className="xA-cell" data-cell="top-a">c</div>
      <div className="xA-cell" data-cell="top-a">d</div>
      <div className="xA-cell" data-cell="top-a">e</div>
      <div className="xA-cell" data-cell="top-a">f</div>
      <div className="xA-cell" data-cell="top-a">g</div>
      <div className="xA-cell" data-cell="top-a">h</div>
      <div className="empty-cell" data-cell="top-empty" />
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
);

export default Board;
