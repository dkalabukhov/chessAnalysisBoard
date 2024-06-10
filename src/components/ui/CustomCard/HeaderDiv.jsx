import chessLogo from '../../../assets/images/chess_logo.png';

const HeaderDiv = () => (
  <div className="header-div">
    <h1>hexlet chess</h1>
    <div className="ellipse">
      <img src={chessLogo} alt="chess-logo" />
    </div>
  </div>
);

export default HeaderDiv;
