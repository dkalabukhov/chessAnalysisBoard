import { useState } from 'react';
import ButtonRow from './ButtonRow';

const GroupButtons = () => {
  const [active, setActive] = useState('');

  const handleClick = (color) => {
    setActive(color);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      <ButtonRow handleClick={handleClick} active={active} checkboxColor="white" inputText="" inputLabel="Pavel" />
      <ButtonRow handleClick={handleClick} active={active} checkboxColor="black" inputText="" inputLabel="Gleboffski" />
      <ButtonRow handleClick={handleClick} active={active} checkboxColor="viewer" inputText="" inputLabel="Gleboffski" />
    </div>
  );
};

export default GroupButtons;
