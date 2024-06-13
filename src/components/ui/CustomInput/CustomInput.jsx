import { Input, Form } from 'antd';

const CustomInput = ({
  text, label, disabled, value, onChange,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
    <span className="form-label">{text}</span>
    <Form.Item>
      <Input placeholder={label} disabled={disabled} value={value} onChange={onChange} />
    </Form.Item>
  </div>

);

export default CustomInput;
