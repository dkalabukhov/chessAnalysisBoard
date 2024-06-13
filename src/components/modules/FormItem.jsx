import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import CustomInput from '../ui/CustomInput/CustomInput';
import CustomButton from '../ui/CustomButton/CustomButton';
import CustomTable from '../ui/CustomTable/CustomTable';
import columns from '../modules/sources/columns/columns';
import action from '../../services/action';
import sendAction from '../../services/sendAction';
import useGlobal from '../../services/useGlobal';

const FormItem = () => {
  const [newForm] = useForm();
  const [joinForm] = useForm();
  const [idToConnect, setID] = useState();
  const [newGameName, setnewGameName] = useState();
  const { globalState } = useGlobal();

  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  const handlenewGameNameChange = (event) => {
    setnewGameName(event.target.value);
  };

  const handleNameChange = (event) => {
    // console.log(globalState.websocket);

    sendAction(globalState.websocket, 'rename', { userName: event.target.value });
  };

  return (
    <>
      <Form form={newForm}>
        <div style={{ width: '50%' }}>
          <CustomInput text="Ваше имя" label="Введите своё имя" defaultValue={globalState.userName} onChange={handleNameChange} />
        </div>
        <div className="form-row">
          <div className="row-item"><CustomInput text="Игровая комната" label="комната Pavel" onChange={handlenewGameNameChange} /></div>
          <div className="row-item"><CustomButton text="Создать" className="row-btn" onClick={action('createGame', { gameName: newGameName || `${globalState.userName}\`s board` })} /></div>
        </div>
      </Form>
      <Form form={joinForm}>
        <div className="form-row">
          <div className="row-item"><CustomInput text="ID-игры" label="ID комнаты" onChange={handleIDChange} /></div>
          <div className="row-item">
            <CustomButton text="Подключиться" className="row-btn" onClick={action('join', { gameID: idToConnect })} />
          </div>
        </div>
        <CustomTable columns={columns} />
      </Form>
    </>
  );
};

export default FormItem;
