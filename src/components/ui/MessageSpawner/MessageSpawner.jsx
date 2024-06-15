import { useEffect, useState } from 'react';
import useGlobal from '../../../services/useGlobal';
import './Modal.css';
import Floater from './Floater';

const MessageSpawner = () => {
  const { globalState } = useGlobal();
  const [messages, setMessages] = useState([]);

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { id: Math.random(), from, text }]);
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  useEffect(() => {
    globalState.websocket.addEventListener('message', (event) => {
      const { action, payload } = JSON.parse(event.data);
      console.log(payload);
      if (action === 'chat') addMessage(payload.from, payload.message);
    });
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <Floater
          key={message.id}
          from={message.from}
          text={message.text}
          onClose={() => removeMessage(message.id)}
        />
      ))}
    </div>
  );
};

export default MessageSpawner;
