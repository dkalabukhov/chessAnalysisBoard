import { Input, Form } from 'antd';

const CustomInput = ({
  text, label, disabled, value, onChange, defaultValue,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
    <span className="form-label">{text}</span>
    <Form.Item>
      <Input
        placeholder={label}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
      />
    </Form.Item>
  </div>

);

export default CustomInput;
