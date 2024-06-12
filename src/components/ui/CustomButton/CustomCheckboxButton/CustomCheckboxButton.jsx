/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import buttonWhite from '../../../../assets/images/button-white.png';
import buttonBlack from '../../../../assets/images/button-black.png';
import buttonViewer from '../../../../assets/images/button-viewer.png';
import buttonWhiteActive from '../../../../assets/images/button-white-active.png';
import buttonBlackActive from '../../../../assets/images/button-black-active.png';

const buttonSelector = {
  white: {
    img: buttonWhite,
    text: 'Белые',
  },
  black: {
    img: buttonBlack,
    text: 'Черные',
  },
  viewer: {
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
  viewer: {
    img: buttonViewer,
  },
};

const CustomCheckboxButton = ({ color, hadnleClick, active }) => {
  const imgSource = color !== active ? buttonSelector[color].img : buttonActiveSelector[color].img;

  return (
    <div className={color !== 'viewer' ? 'checkbox' : 'checkbox-start'}>
      <span>{buttonSelector[color].text}</span>
      <img
        className="checkbox-img"
        src={imgSource}
        alt="checkbox"
        onClick={() => hadnleClick(color)}
      />
    </div>
  );
};

export default CustomCheckboxButton;
