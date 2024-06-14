/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import buttonWhite from '../../../../assets/images/button-white.png';
import buttonBlack from '../../../../assets/images/button-black.png';
import buttonViewer from '../../../../assets/images/button-viewer.png';
import buttonWhiteActive from '../../../../assets/images/button-white-active.png';
import buttonBlackActive from '../../../../assets/images/button-black-active.png';
import buttonViewerActive from '../../../../assets/images/button-viewer-active.png';
import useGlobal from '../../../../services/useGlobal';

const buttonSelector = {
  white: {
    img: buttonWhite,
    text: 'Белые',
  },
  black: {
    img: buttonBlack,
    text: 'Черные',
  },
  spectator: {
    img: buttonViewer,
    text: 'Наблюдатель',
  },
};

const buttonActiveSelector = {
  white: {
    img: buttonWhiteActive,
  },
  black: {
    img: buttonBlackActive,
  },
  spectator: {
    img: buttonViewerActive,
  },
};

const CustomCheckboxButton = ({
  color, active, onClick,
}) => {
  const { globalState } = useGlobal();
  const side = globalState.side || 'spectator';
  const imgSource = color !== active
    ? buttonSelector[side].img
    : buttonActiveSelector[side].img;

  return (
    <div className={side !== 'spectator' ? 'checkbox' : 'checkbox-start'}>
      <span>{buttonSelector[side].text}</span>
      <img
        className="checkbox-img"
        src={imgSource}
        alt="checkbox"
        onClick={() => onClick()}
      />
    </div>
  );
};

export default CustomCheckboxButton;
