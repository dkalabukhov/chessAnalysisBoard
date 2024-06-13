import useGlobal from '../../services/useGlobal.js';

const NoConnectionPage = () => {
  const { globalState } = useGlobal();

  console.log(globalState.connectionStatus);
  const messages = {
    awaiting: 'Подключение устанавливается, ожидайте',
    online: 'Подключение установлено, загрузка состояния',
    offline: 'соединение потеряно, попробуйте перезагрузить страницу',
  };

  return (
    <h1>{messages[globalState.connectionStatus]}</h1>
  );
};
export default NoConnectionPage;
