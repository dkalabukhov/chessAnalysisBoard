import './PlayerBar.scss';
// import { ReactComponent as MyIcon } from '../../../../public/assets/crown.svg';
import crownIcon from '../../../assets/images/crown.svg';

const PlayerBar = ({ status = 'online', playerName = 'игрок', isHost }) => {
  const isVisible = (isHost ? 'default' : 'none');
  return (
    <div className="playerBar">
      <div className={`playerStatus ${status}`} />
      <div className="playerName">{playerName}</div>
      <img className="crown" src={crownIcon} style={{ display: isVisible }} alt="Host" />
    </div>
  );
};

export default PlayerBar;
