// import { message } from 'antd';
import draw from '../../../assets/images/chessTable/draw.png';
import surrender from '../../../assets/images/chessTable/surrender.png';
import win from '../../../assets/images/win.svg';
import cross from '../../../assets/images/cross.svg';
import useGlobal from '../../../services/useGlobal';
import PlayersBlock from '../../modules/Lobby/PlayersBlock';
import HeaderDiv from '../CustomCard/HeaderDiv';
import action from '../../../services/action';
import sendAction from '../../../services/sendAction';
import leaveIcon from '../../../assets/images/logouticon.png';

const InfoBtn = ({
  // text, image, alt, width, hide, imgSize = '40px', onClick,
  text, image, width, hide, imgSize = '40px', onClick, color = 'none',
}) => {
  const style = {
    background: color,
    border: '1px solid rgb(209, 208, 208)',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    height: '50px',
    width,
    alignItems: 'center',
    display: hide ? 'none' : 'flex',
    justifyContent: 'center',
  };
  return (
    <button type="button" title={text} style={style} onClick={onClick}>
      <div style={{ marginLeft: 'auto' }}>{text}</div>
      {/* {text} */}
      <img
        src={image}
        alt={text}
        srcSet=""
        style={{
          width: imgSize, height: imgSize, alignSelf: 'center', justifySelf: 'end', marginLeft: 'auto',
        }}
      />
    </button>
  );
};

const FlexContainer = ({ children, width, hide }) => (
  <div
    className="flex-container"
    style={{
      width,
      height: '52px',
      margin: '0px',
      padding: '1px',
      display: hide ? 'none' : 'flex',
    }}
  >
    {children}

  </div>
);

const InfoBlock = () => {
  const { globalState, updateGlobalState } = useGlobal();
  const activeSideText = { white: 'Ход белых', black: 'Ход черных' };
  const btnWidth = '220px';
  const halfWidth = '110px';
  // const propose = action('proposeDraw');
  // const proposalMessage = action('chat', { message: 'Предлагаю ничью!' });
  const refusalMessage = action('chat', { message: 'Я отказываюсь от ничьей!' });
  const isSpectator = globalState.side === 'spectator';
  return (
    <div className="info">
      <HeaderDiv />
      <h3 className="info__status">{activeSideText[globalState.activeSide]}</h3>
      <form className="info__form">
        <FlexContainer width={btnWidth}>
          {!isSpectator && (
          <InfoBtn
            hide={!globalState.ableToDeclareWin}
            text="Объявить победу"
            image={win}
            width={btnWidth}
            onClick={action('finishGame', { result: 'win', reason: 'противник отсутствовал слишком долго.' })}
            color="lightgreen"
          />
          )}
        </FlexContainer>
        <FlexContainer width={btnWidth} hide={!globalState.ableToDeclareDraw}>
          {!isSpectator && (
          <>
            <InfoBtn
              text="Ничья"
              image={draw}
              width={halfWidth}
              onClick={action('finishGame', { result: 'draw', reason: 'по соглашению игроков.' })}
              color="rgb(255, 255, 96)"
            />
            <InfoBtn
              text="Отказ"
              image={cross}
              imgSize="32px"
              width={halfWidth}
              onClick={() => { refusalMessage(); updateGlobalState({ ableToDeclareDraw: false }); }}
              color="rgb(255, 176, 176)"
            />
          </>
          )}
        </FlexContainer>
        <FlexContainer width={btnWidth} hide={globalState.ableToDeclareDraw}>
          {!isSpectator && (
          <InfoBtn
            text="Предложить ничью"
            image={draw}
            width={btnWidth}
            onClick={action('proposeDraw')}
          />
          )}
          {isSpectator && (
          <InfoBtn
            text="Покинуть игру"
            image={leaveIcon}
            width={btnWidth}
            onClick={() => { sendAction(globalState.websocket, 'leave'); window.location.reload(); }}
          />
          )}
        </FlexContainer>
        <FlexContainer width={btnWidth}>
          {!isSpectator && (
          <InfoBtn
            text="Сдаться"
            image={surrender}
            width={btnWidth}
            onClick={action('finishGame', { result: 'loss', reason: `${globalState.userName} сдался.` })}
          />
          )}
        </FlexContainer>
      </form>

      <PlayersBlock width="100%" padding="32px" />
      <FlexContainer width={btnWidth} justifySelf="end" />
    </div>
  );
};

export default InfoBlock;
