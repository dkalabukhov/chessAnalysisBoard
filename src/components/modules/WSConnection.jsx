import { createContext, useEffect, useState } from 'react';
import useGlobal from '../../services/useGlobal';

// Создание контекста для глобального состояния
export const GlobalContext = createContext();

// Компонент-провайдер, который будет обертывать ваше приложение
export const WSConnection = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    connectionStatus: 'waiting',
  });

  // Функция для обновления глобального состояния
  const updateGlobalState = (newState) => {
    setGlobalState((prevState) => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    updateGlobalState({ connectionStatus: 'awaiting' });
    // const websocket = new WebSocket('wss://felarn.ru');
    const websocket = new WebSocket('ws://localhost:4444');
    // setWs(websocket);

    const sendMessage = () => {
      if (websocket) {
        websocket.send(JSON.stringify({ action: 'registration' }));
      }
    };

    websocket.onopen = () => {
      console.log('Connected to the WebSocket server');
      updateGlobalState({ connectionStatus: 'online' });
      // setConnectionStatus('online');
      sendMessage();
    };

    websocket.onmessage = (event) => {
      const { payload } = JSON.parse(event.data);
      updateGlobalState(payload);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      updateGlobalState({ connectionStatus: 'offline' });
      // setConnectionStatus('offline');
    };

    websocket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
      updateGlobalState({ connectionStatus: 'offline' });
      // setConnectionStatus('offline');
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
