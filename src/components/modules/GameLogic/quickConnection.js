// export default class {
export default () =>
  new Promise(function (resolve, reject) {
    // const serverURL = "ws://localhost:4444"; // для подключения к локальному серверу
    const serverURL = 'wss://felarn.ru'; // для подключения к online-серверу
    const connection = new WebSocket(serverURL);

    const sendAction = (action, payload = null) => {
      connection.send(JSON.stringify({ action, payload }));
    };

    connection.onopen = () => {
      setInterval(() => sendAction('hello'), 20000);
      const userID = sessionStorage.getItem('userID');
      if (userID) {
        sendAction('identification', { userID, userName: 'Anon' });
      } else {
        sendAction('registration', { userName: 'Quick Connector' });
      }
      return connection;
    };

    connection.onmessage = (event) => {
      const { action, payload } = JSON.parse(event.data);

      switch (action) {
        case 'registered':
          // sessionStorage.setItem("userID", payload.userID);

          break;

        case 'identified':
          break;

        case 'roomsList':
          if (payload.list.length > 0 && payload.list[0].playerCount == 1) {
            sendAction('join', { gameID: payload.list[0].gameID });
            connection.onmessage = (event) => {
              const { action, payload } = JSON.parse(event.data);
              if (action === 'newUserCondition' && payload.userCondition === 'inLobby') {
                sendAction('pickSide', { side: 'black' });
                sendAction('rename', { userName: 'black Player' });

                sendAction('startMatch', {
                  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                });
                resolve(connection);
              }
            };
          } else {
            sendAction('createGame');
            connection.onmessage = (event) => {
              const { action, payload } = JSON.parse(event.data);
              if (action === 'newUserCondition' && payload.userCondition === 'inLobby') {
                sendAction('pickSide', { side: 'white' });
                sendAction('rename', { userName: 'white Player' });
                resolve(connection);
              }
            };
          }
          break;

        default:
          break;
      }
    };

    connection.onerror = function () {
      reject();
    };
  });
