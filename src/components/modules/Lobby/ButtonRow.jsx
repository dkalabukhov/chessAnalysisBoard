import CustomInput from '../../ui/CustomInput/CustomInput';
import CustomCheckboxButton from '../../ui/CustomButton/CustomCheckboxButton/CustomCheckboxButton';

const ButtonRow = ({
  checkboxColor, inputText, inputLabel, handleClick, active,
}) => (
  <div className="button-row">
    <CustomCheckboxButton color={checkboxColor} hadnleClick={handleClick} active={active} />
    {checkboxColor !== 'viewer' ? (
      <div style={{ marginTop: 21 }}>
        <CustomInput text={inputText} label={inputLabel} />
      </div>
    ) : null}
  </div>
);

export default ButtonRow;
