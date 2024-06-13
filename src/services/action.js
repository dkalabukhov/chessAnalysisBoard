import useGlobal from './useGlobal';
import sendAction from './sendAction';

export default (action, payload = null) => {
  const { globalState } = useGlobal();
  return () => sendAction(globalState.websocket, action, payload);
};
