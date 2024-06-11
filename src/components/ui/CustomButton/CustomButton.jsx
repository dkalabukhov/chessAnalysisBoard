import { Button } from 'antd';

const CustomButton = ({ text, className, onClick }) => (
  <Button style={{ width: '100%' }} className={className} onClick={() => onClick()}>{text}</Button>
);

export default CustomButton;
