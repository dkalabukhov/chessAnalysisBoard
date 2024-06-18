import { Button } from 'antd';
import { Tooltip } from 'react-tooltip';

const CustomButton = ({
  text, className, onClick, hide = false, disabled = false, tooltip,
}) => (
  <>
    <Button
      style={{ width: '100%', display: hide ? 'none' : 'flex' }}
      className={className}
      onClick={() => onClick()}
      disabled={disabled}
      data-tooltip-id="buttonTooltip"
      data-tooltip-content={tooltip}
    >
      {text}
    </Button>

    <Tooltip id="buttonTooltip" />
  </>
);

export default CustomButton;
