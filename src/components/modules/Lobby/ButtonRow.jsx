import CustomInput from '../../ui/CustomInput/CustomInput';
import CustomCheckboxButton from '../../ui/CustomButton/CustomCheckboxButton/CustomCheckboxButton';
import useGlobal from '../../../services/useGlobal';

const ButtonRow = ({
  checkboxSide, value, inputText, inputLabel, handleClick, active, onClick = () => {},
}) => {
  const { globalState } = useGlobal();
  return (
    <div className="button-row">
      <CustomCheckboxButton
        side={checkboxSide}
        hadnleClick={handleClick}
        active={active}
        onClick={() => onClick()}
      />
      {checkboxSide !== 'spectator' ? (
        <div style={{ marginTop: 21 }}>
          <CustomInput
            text={inputText}
            label={inputLabel}
            disabled
            value={value}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ButtonRow;
