import useGlobal from '../../../services/useGlobal';
import PlayerBar from '../../ui/PlayerBar/PlayerBar';

const PlayersBlock = ({ width, padding }) => {
  const { globalState } = useGlobal();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '2px', width, textAlign: 'center', padding,
    }}
    >
      <span>В комнате находятся:</span>
      <div className="players-block" style={{ overflowY: 'auto', width }}>
        {globalState.playerList
        && globalState.playerList.map((player, index) => (
          <PlayerBar
            key={index}
            playerName={player.userName}
            status={player.connectionStatus}
            isHost={player.isHost}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayersBlock;
