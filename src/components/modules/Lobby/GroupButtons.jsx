import { useState } from 'react';
import ButtonRow from './ButtonRow';
import action from '../../../services/action';

const GroupButtons = () => {
  const [active, setActive] = useState('');

  const handleClick = (color) => {
    setActive(color);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      <ButtonRow onClick={action('pickSide', { side: 'white' })} handleClick={handleClick} active={active} checkboxColor="white" inputText="" inputLabel="Pavel" />
      <ButtonRow onClick={action('pickSide', { side: 'black' })} handleClick={handleClick} active={active} checkboxColor="black" inputText="" inputLabel="Gleboffski" />
      <ButtonRow onClick={action('pickSide', { side: 'spectator' })} handleClick={handleClick} active={active} checkboxColor="viewer" inputText="" inputLabel="Gleboffski" />
    </div>
  );
};

export default GroupButtons;

// action("pickSide", { side: state.playerSide })
