import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import CustomInput from './ui/CustomInput/CustomInput';
import CustomButton from './ui/CustomButton/CustomButton';
import CustomTable from './ui/CustomTable/CustomTable';
import columns from './modules/sources/columns/columns';

const FormItem = () => {
  const [form] = useForm();

  return (
    <Form form={form}>
      <div style={{ width: '50%' }}>
        <CustomInput text="Ваше имя" label="Введите своё имя" />
      </div>
      <div className="form-row">
        <div className="row-item"><CustomInput text="Игровая комната" label="комната Pavel" /></div>
        <div className="row-item"><CustomButton text="Создать" className="row-btn" /></div>
      </div>
      <div className="form-row">
        <div className="row-item"><CustomInput text="ID-игры" label="ID комнаты" /></div>
        <div className="row-item">
          {' '}
          <CustomButton text="Подключиться" className="row-btn" />
        </div>
      </div>
      <CustomTable columns={columns} />
    </Form>
  );
};

export default FormItem;
