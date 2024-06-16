import useGlobal from '../../services/useGlobal.js';

const BottomPlayer = () => {
  const { globalState } = useGlobal();
  const { side } = globalState;
  const topPlayerSide = side === 'black' ? 'black' : 'white';
  if (!globalState.playerList) return null;
  const [topPlayer] = globalState.playerList.filter((player) => player.side === topPlayerSide);
  const { userName } = topPlayer;
  return (
    <div className="bottom-player">
      <h3 className="bottom-player__color">{ side === 'black' ? 'Черные' : 'Белые' }</h3>
      <h3 className="bottom-player__username">
        {userName}
      </h3>
      <div className={`playerStatus ${topPlayer.connectionStatus} icon-small`} />
    </div>
  );
};

export default BottomPlayer;
