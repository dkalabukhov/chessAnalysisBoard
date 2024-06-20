import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
// import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import CustomInput from '../../ui/CustomInput/CustomInput';
import copyIcon from '../../../assets/images/copy-icon.svg';
import CustomButton from '../../ui/CustomButton/CustomButton';
import PlayersBlock from './PlayersBlock';
import GroupButtons from './GroupButtons';
import action from '../../../services/action';
import useGlobal from '../../../services/useGlobal';
import sendAction from '../../../services/sendAction';
import PrivacySwitcher from '../../ui/CustomButton/CustomCheckboxButton/PrivacySwitcher';

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
      .catch((err) => {
        console.error('Не удалось скопировать текст: ', err);
      });
  };

  let startTooltip = 'Начать матч';
  if (!globalState.whitePlayerName || !globalState.blackPlayerName) startTooltip = 'Для начал матча необходимо чтобы два игрока выбрали сторону';
  if (!globalState.youAreHost) startTooltip = 'Начать игру может только создатель';

  return (
    <Form form={form} style={{ justifyContent: 'start' }}>
      <div className="form-row" style={{ width: '60%' }}>
        <PrivacySwitcher />
        <CustomInput
          className={`roomName ${globalState.youAreHost ? 'host' : ''}`}
          text="комната:"
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
          data-tooltip-id="copyID"
          data-tooltip-content="скопировать ID игры в буфер обмена"
        />
        <Tooltip id="copyID" />

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
            disabled={!globalState.youAreHost
              || !globalState.whitePlayerName
              || !globalState.blackPlayerName}
            tooltip={startTooltip}
          />

        </div>
      </div>
    </Form>
  );
};

export default FormItem;
