// import draw from '../../../assets/images/chessTable/draw.png';
// import surrender from '../../../assets/images/chessTable/surrender.png';
// import win from '../../../assets/images/win.svg';
import useGlobal from '../../../services/useGlobal';
import HeaderDiv from '../CustomCard/HeaderDiv';
import sendAction from '../../../services/sendAction';
import CustomButton from '../CustomButton/CustomButton';

const FlexContainer = ({
  children, width, hide, flexDirection = 'row', justifySelf,
}) => (
  <div
    className="flex-container"
    style={{
      flexDirection,
      width,
      height: '52px',
      margin: '0px',
      padding: '1px',
      display: hide ? 'none' : 'flex',
      justifySelf,
      marginTop: 'auto',
    }}
  >
    {children}

  </div>
);

const ResultsBlock = () => {
  // const { globalState, updateGlobalState } = useGlobal();
  const { globalState } = useGlobal();
  console.log('ResultsBlock globalState: ', globalState);
  const btnWidth = '220px';
  const styleCentered = {
    textAlign: 'center', alignSelfSelf: 'center', justifySelf: 'center', margin: 'auto',
  };
  return (
    <div className="info">
      <HeaderDiv />

      <form className="info__form" style={{ marginTop: 'auto' }}>
        <FlexContainer width={btnWidth} flexDirection="column">
          <p className="info__status" style={styleCentered}>
            Игра завершилась
          </p>
        </FlexContainer>
        <FlexContainer width={btnWidth}>
          {globalState.isDraw
            ? (
              <p className="info__status" style={styleCentered}>
                ничьей.
              </p>
            )
            : (
              <p style={styleCentered} className="info__status">
                {'победой '}
                {globalState.winnerSide === 'white' && 'белых.'}
                {globalState.winnerSide === 'black' && 'черных.'}
              </p>
            )}
        </FlexContainer>
        {/* <FlexContainer width={btnWidth}>
          <p style={styleCentered} className="info__reason">

            {'Причина: '}
          </p>
        </FlexContainer>
        <FlexContainer width={btnWidth}>
          <p style={styleCentered} className="info__reason">

            {globalState.reason}
          </p>
        </FlexContainer> */}
        <FlexContainer width={btnWidth}> </FlexContainer>
        <FlexContainer width={btnWidth}>
          <p className="info__reason">

            {'Причина: '}
            {globalState.reason}
          </p>
        </FlexContainer>
        <FlexContainer width={btnWidth} />
        { globalState.winnerName
        && (
        <FlexContainer width={btnWidth}>
          <p className="info__players">

            {globalState.isWinner ? 'Вы победили.' : `${globalState.winnerName} победил.`}
          </p>
        </FlexContainer>
        )}

        { globalState.looserName
        && (
        <FlexContainer width={btnWidth}>
          <p className="info__players">

            {globalState.isLooser ? 'Вы проиграли.' : `${globalState.looserName} проиграл.`}
          </p>
        </FlexContainer>
        )}
      </form>
      <FlexContainer width={btnWidth} justifySelf="end">
        <CustomButton text="Выйти в главное меню" className="row-btn" onClick={() => { sendAction(globalState.websocket, 'leave'); window.location.reload(); }} />
      </FlexContainer>
      {/* <PlayersBlock width="100%" padding="12px" /> */}

    </div>
  );
};

export default ResultsBlock;
