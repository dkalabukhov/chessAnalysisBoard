import { Button } from 'antd';

const CustomButton = ({
  text, className, onClick, hide = false,
}) => (
  <Button style={{ width: '100%', display: hide ? 'none' : 'flex' }} className={className} onClick={() => onClick()}>{text}</Button>
);

export default CustomButton;
