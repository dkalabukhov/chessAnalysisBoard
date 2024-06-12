import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../ui/CustomInput/CustomInput';
import copyLogo from '../../../assets/images/copy-logo.png';
import CustomButton from '../../ui/CustomButton/CustomButton';
import PlayersBlock from './PlayersBlock';
import GroupButtons from './GroupButtons';

const FormItem = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const hadnleGoTo = () => {
    navigate('playroom');
  };

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
      <div className="form-row">
        <div style={{ width: '60%' }}>
          <GroupButtons />
        </div>
        <PlayersBlock />
      </div>
      <div className="form-row">
        <div className="row-item">
          <CustomButton text="Выйти из комнаты" className="row-btn" onClick={() => handleGoBack()} />
        </div>
        <div className="row-item">
          <CustomButton text="Начать партию" className="row-btn" onClick={() => hadnleGoTo()} />
        </div>
      </div>
    </Form>
  );
};

export default FormItem;
