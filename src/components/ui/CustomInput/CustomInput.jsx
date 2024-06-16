import { Input, Form } from 'antd';

const CustomInput = ({
  text, label, disabled, value, onChange, defaultValue, onBlur, onPressEnter,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
    <span className="form-label">{text}</span>
    <Form.Item>
      <Input
        placeholder={label}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
        disabled={disabled}
      />
    </Form.Item>
  </div>

);

export default CustomInput;
