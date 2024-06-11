import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import CustomInput from '../../ui/CustomInput/CustomInput';
import copyLogo from '../../../assets/images/copy-logo.png';

const FormItem = () => {
  const [form] = useForm();

  return (
    <Form form={form}>
      <div style={{ width: '50%' }}>
        <CustomInput text="Игровая комната" label="комната Pavel" disabled />
      </div>
      <div className="form-row">
        <div style={{ flex: 1 }}>
          <CustomInput text="Игровая комната" label="комната Pavel" disabled />
        </div>
        <img src={copyLogo} alt="copy-logo" style={{ marginTop: 19 }} />
      </div>
    </Form>
  );
};

export default FormItem;
