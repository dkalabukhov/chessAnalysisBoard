export default () => {
  let serverURL = 'ws://localhost:4444';
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    serverURL = 'ws://localhost:4444';
    // serverURL = 'wss://felarn.ru/';

    // console.log(
    //   `Сайт запущен на локальном сервере. Подключение к серверу${serverURL}`,
    // );
  } else {
    serverURL = 'wss://felarn.ru/';
    // console.log('Сайт развернут на хостинге');
  }
  return serverURL;
};
