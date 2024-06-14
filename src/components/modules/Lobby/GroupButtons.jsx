import { useState } from 'react';
import ButtonRow from './ButtonRow';
import action from '../../../services/action';
import useGlobal from '../../../services/useGlobal';

const GroupButtons = () => {
  const { globalState } = useGlobal();
  const [active, setActive] = useState('');

  // const handleClick = (side) => {
  //   setActive(side);
  // };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      <ButtonRow onClick={action('pickSide', { side: 'white' })} active={active} checkboxSide="white" inputText="Игрок:" value={globalState.whitePlayerName} inputLabel="свободно" />
      <ButtonRow onClick={action('pickSide', { side: 'black' })} active={active} checkboxSide="black" inputText="Игрок:" value={globalState.blackPlayerName} inputLabel="свободно" />
      <ButtonRow onClick={action('pickSide', { side: 'spectator' })} active={active} checkboxSide="spectator" inputText="Зритель" inputLabel="" />
    </div>
  );
};

export default GroupButtons;

// action("pickSide", { side: state.playerSide })
