import { Input, Form } from 'antd';

const CustomInput = ({
  text, label, disabled, value, onChange, defaultValue, onBlur, onPressEnter, className,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
    <span className="form-label">{text}</span>
    <Form.Item>
      <Input
        className={className}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
        disabled={disabled}
        placeholder={label}
        defaultValue={defaultValue}
      />
    </Form.Item>
  </div>

);

export default CustomInput;
