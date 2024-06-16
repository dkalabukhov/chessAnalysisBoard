import draw from '../../../assets/images/chessTable/draw.png';
import surrender from '../../../assets/images/chessTable/surrender.png';
import useGlobal from '../../../services/useGlobal';
import PlayersBlock from '../../modules/Lobby/PlayersBlock';

const InfoBlock = () => {
  const { globalState } = useGlobal();
  const activeSideText = { white: 'Ход белых', black: 'Ход черных' };
  return (
    <div className="info">

      <h3 className="info__status">{activeSideText[globalState.activeSide]}</h3>
      <form className="info__form">
        <button type="button" id="propose_draw" className="info__btn draw" title="Предложить ничью">
          <img src={draw} alt="Предложить ничью" srcSet="" />
        </button>
        <button type="button" id="surrender" className="info__btn surrender" title="Сдаться">
          <img src={surrender} alt="Сдаться" srcSet="" />
        </button>
      </form>

      <PlayersBlock width="90%" />
    </div>
  );
};

export default InfoBlock;
