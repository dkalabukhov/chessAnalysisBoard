import useGlobal from '../../../services/useGlobal';
import PlayerBar from '../../ui/PlayerBar/PlayerBar';

const PlayersBlock = () => {
  const { globalState } = useGlobal();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '2px',
    }}
    >
      <span>Список игроков</span>
      <div className="players-block" style={{ overflowY: 'auto' }}>
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
