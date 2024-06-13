const sendAction = (websocket, action, payload = null) => {
  if (websocket) {
    websocket.send(JSON.stringify({ action, payload }));
  }
};
export default sendAction;
