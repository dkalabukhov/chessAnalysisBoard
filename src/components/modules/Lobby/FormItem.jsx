import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
// import { useNavigate } from 'react-router-dom';
import CustomInput from '../../ui/CustomInput/CustomInput';
import copyLogo from '../../../assets/images/copy-logo.png';
import CustomButton from '../../ui/CustomButton/CustomButton';
import PlayersBlock from './PlayersBlock';
import GroupButtons from './GroupButtons';
import action from '../../../services/action';
import useGlobal from '../../../services/useGlobal';

const FormItem = () => {
  const [form] = useForm();
  const { globalState } = useGlobal();

  const handleGameNameChange = (event) => {
    console.log(event.target.value);
    // sendAction(globalState.websocket, 'rename', { userName: event.target.value });
  };

  return (
    <Form form={form}>
      <div style={{ width: '50%' }}>
        <CustomInput text="Игровая комната" disabled={!globalState.youAreHost} defaultValue={globalState.gameName} onChange={handleGameNameChange} />
      </div>
      <div className="form-row">
        <div style={{ flex: 1 }}>
          <CustomInput text="ID комнаты" value={globalState.gameID} />
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
          <CustomButton text="Выйти из комнаты" className="row-btn" onClick={action('leave')} />
        </div>
        <div className="row-item">
          <CustomButton
            text="Начать партию"
            className="row-btn"
            onClick={action('startMatch', { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' })}
          />
        </div>
      </div>
    </Form>
  );
};

export default FormItem;
