import { Input, Form } from 'antd';

const CustomInput = ({ text, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
    <span className="form-label">{text}</span>
    <Form.Item>
      <Input placeholder={label} />
    </Form.Item>
  </div>

);

export default CustomInput;
