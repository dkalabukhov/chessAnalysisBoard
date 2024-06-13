import { useEffect, useState } from 'react';
import GlobalContext from '../../services/GlobalContext.js';
import sendAction from '../../services/sendAction.js';

// Компонент-провайдер, который будет обертывать приложение
const WSConnection = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    connectionStatus: 'waiting',
  });

  // Функция для обновления глобального состояния
  const updateGlobalState = (newState) => {
    setGlobalState((prevState) => ({ ...prevState, ...newState }));
  };

  const identification = (connection) => {
    const userID = sessionStorage.getItem('userID');
    console.log(`USER ID: ${userID}`);
    if (userID) {
      const payload = { userID };
      sendAction(connection, 'identification', payload);
    } else {
      sendAction(connection, 'registration');
    }
  };

  useEffect(() => {
    updateGlobalState({ connectionStatus: 'awaiting' });
    const websocket = new WebSocket('wss://felarn.ru');
    // const websocket = new WebSocket('ws://localhost:4444');
    updateGlobalState({ websocket });

    websocket.onopen = () => {
      console.log('Connected to the WebSocket server');
      updateGlobalState({ connectionStatus: 'online' });
      identification(websocket);
    };

    websocket.onmessage = (event) => {
      const { action, payload } = JSON.parse(event.data);
      console.log(`action: ${action} <<`);
      if (action === 'registered') sessionStorage.setItem('userID', payload.userID);
      updateGlobalState(payload);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      updateGlobalState({ connectionStatus: 'offline' });
    };

    websocket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
      updateGlobalState({ connectionStatus: 'offline' });
    };

    // Очистка при размонтировании компонента
    return () => {
      websocket.close();
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default WSConnection;
