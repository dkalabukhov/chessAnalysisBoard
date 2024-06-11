const serverURL = 'wss://felarn.ru';
const connection = new WebSocket(serverURL);

connection.onopen = () => {
  console.log('WebSocket connection established');
  connection.send('hello');
};
