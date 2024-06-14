import useGlobal from '../../services/useGlobal.js';
import '../../assets/scss/loader.scss';

const NoConnectionPage = () => {
  const { globalState } = useGlobal();

  // console.log(globalState.connectionStatus);
  const messages = {
    awaiting: (<h1 className="loader-title">
      Подключение устанавливается.
      <br />
      Ожидайте.
    </h1>),
    online: (<h1 className="loader-title">
      Подключение установлено.
      <br />
      Загрузка состояния.
    </h1>),
    offline: (<h1 className="loader-title">
      Соединение потеряно.
      <br />
      Попробуйте перезагрузить страницу.
    </h1>),
  };

  const color = {
    awaiting: 'yellow',
    online: 'green',
    offline: 'red',

  };

  return (
    <>
      {messages[globalState.connectionStatus]}
      <div className="loader">
        <div className={`loader-inner ${color[globalState.connectionStatus]}`} />
      </div>
    </>
  );
};
export default NoConnectionPage;
