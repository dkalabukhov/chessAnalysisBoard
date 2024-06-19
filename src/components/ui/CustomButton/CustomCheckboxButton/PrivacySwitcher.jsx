import { Tooltip } from 'react-tooltip';
import lockedIcon from '../../../../assets/images/locked-Icon.svg';
import unlockedIcon from '../../../../assets/images/unlocked-Icon.svg';
import action from '../../../../services/action';
import useGlobal from '../../../../services/useGlobal';

const buttonSelector = {
  private: {
    img: lockedIcon,
    text: 'Закрытая',
    tip: 'к этой игре возможно подключиться только по ID',
  },
  open: {
    img: unlockedIcon,
    text: 'Зткрытая',
    tip: 'игра видна на главной странице\nлюбой может присоединиться',
  },
};

const PrivacySwitcher = () => {
  const { globalState } = useGlobal();
  const gameType = globalState.isPrivate ? 'private' : 'open';

  return (
    <div className="checkbox-start" style={{ alignItems: 'center' }}>
      <span>{buttonSelector[gameType].text}</span>
      <img
        className="checkbox-img"
        src={buttonSelector[gameType].img}
        alt="game privacy switcher"
        onClick={action('switcGamePrivacy', { isPrivate: !globalState.isPrivate })}
        data-tooltip-id="privacySwitcher"
        style={{ width: '30px', height: '30px', margin: '3px' }}
        data-tooltip-content={buttonSelector[gameType].tip}
      />
      <Tooltip id="privacySwitcher" />
    </div>
  );
};

export default PrivacySwitcher;
