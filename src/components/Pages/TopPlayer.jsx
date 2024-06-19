import useGlobal from '../../services/useGlobal.js';

const TopPlayer = () => {
  const { globalState } = useGlobal();
  const { side } = globalState;
  const topPlayerSide = side === 'black' ? 'white' : 'black';
  if (!globalState.playerList) return null;
  const [topPlayer] = globalState.playerList.filter((player) => player.side === topPlayerSide);
  if (!topPlayer) return null;
  const { userName } = topPlayer;
  return (
    <div className="top-player">
      <h3 className="top-player__color">{ side === 'black' ? 'Белые' : 'Черные' }</h3>
      <h3 className="top-player__username">
        {userName}
      </h3>
      <div className={`playerStatus ${topPlayer.connectionStatus} icon-small`} />
    </div>
  );
};

export default TopPlayer;
