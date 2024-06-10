import { Button } from 'antd';

const CustomButton = ({ text, className }) => (
  <Button style={{ width: '100%' }} className={className}>{text}</Button>
);

export default CustomButton;
