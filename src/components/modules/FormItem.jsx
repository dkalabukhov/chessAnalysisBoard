import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
// import { useNavigate } from 'react-router-dom';

import CustomInput from '../ui/CustomInput/CustomInput';
import CustomButton from '../ui/CustomButton/CustomButton';
import CustomTable from '../ui/CustomTable/CustomTable';
import columns from '../modules/sources/columns/columns';

const FormItem = () => {
  const [newForm] = useForm();
  const [joinForm] = useForm();

  // const navigate = useNavigate();

  const handleGoToLobby = () => {
    // navigate('lobby');
  };

  return (
    <>
      <Form form={newForm}>
        <div style={{ width: '50%' }}>
          <CustomInput text="Ваше имя" label="Введите своё имя" />
        </div>
        <div className="form-row">
          <div className="row-item"><CustomInput text="Игровая комната" label="комната Pavel" /></div>
          <div className="row-item"><CustomButton text="Создать" className="row-btn" onClick={handleGoToLobby} /></div>
        </div>
      </Form>
      <Form form={joinForm}>
        <div className="form-row">
          <div className="row-item"><CustomInput text="ID-игры" label="ID комнаты" /></div>
          <div className="row-item">
            <CustomButton text="Подключиться" className="row-btn" onClick={handleGoToLobby} />
          </div>
        </div>
        <CustomTable columns={columns} />
      </Form>
    </>
  );
};

export default FormItem;
