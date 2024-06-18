import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
// import { useNavigate } from 'react-router-dom';
import CustomInput from '../../ui/CustomInput/CustomInput';
import copyIcon from '../../../assets/images/copy-icon.svg';
import CustomButton from '../../ui/CustomButton/CustomButton';
import PlayersBlock from './PlayersBlock';
import GroupButtons from './GroupButtons';
import action from '../../../services/action';
import useGlobal from '../../../services/useGlobal';
import sendAction from '../../../services/sendAction';

const FormItem = () => {
  const [form] = useForm();
  const { globalState } = useGlobal();

  const handleGameNameChange = (event) => {
    // console.log(event.target.value);
    if (event.target.value) sendAction(globalState.websocket, 'renameGame', { newGameName: event.target.value });
  };

  const copyID = () => {
    navigator.clipboard
      .writeText(globalState.gameID)
      .then(() => {
        console.log('ID скопирован');
      })
      .catch(() => {
        console.error('Не удалось скопировать текст: ', err);
      });
  };

  return (
    <Form form={form}>
      <div style={{ width: '50%' }}>
        <CustomInput
          className={`roomName ${globalState.youAreHost ? 'host' : ''}`}
          text="Игровая комната"
          disabled={!globalState.youAreHost}
          // style={{ value: globalState.gameName }}
          label={globalState.gameName}
          defaultValue={globalState.gameName}
          onPressEnter={handleGameNameChange}
          onBlur={handleGameNameChange}
        />
      </div>
      <div className="form-row">
        <div style={{ flex: 1 }}>
          <CustomInput text="ID комнаты" value={globalState.gameID} />
        </div>
        <img
          className="copyIDbutton"
          src={copyIcon}
          alt="copy-logo"
          // style={{ marginTop: 19 }}
          onClick={copyID}
        />
      </div>
      <div className="form-row">
        <div style={{ width: '50%' }}>
          <GroupButtons />
        </div>
        <div style={{ width: '50%' }}>
          <PlayersBlock />
        </div>

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
            hide={globalState.side === 'spectator'}
          />
        </div>
      </div>
    </Form>
  );
};

export default FormItem;
