// import { ReactComponent as MyIcon } from '../../../../public/assets/crown.svg';
// CROWN!!!
import crownIcon from '../../../assets/images/crown.svg';
// HOST!!!
// import hostIcon from '../../../assets/images/host.png';

const PlayerBar = ({ status = 'online', playerName = 'игрок', isHost }) => {
  const isVisible = (isHost ? 'default' : 'none');
  return (
    <div className="playerBar">
      <div className={`playerStatus ${status}`} />
      <div className="playerName">{playerName}</div>
      {/* CROWN!!! */}
      <img className="crown" src={crownIcon} style={{ display: isVisible }} alt="Host" />
      {/* HOST!!! */}
      {/* <img className="crown" src={hostIcon} style={{ display: isVisible }} alt="Host" /> */}
    </div>
  );
};

export default PlayerBar;
