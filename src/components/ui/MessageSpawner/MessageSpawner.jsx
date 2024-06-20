import { useEffect, useState } from 'react';
import useGlobal from '../../../services/useGlobal';
import './Modal.css';
import Floater from './Floater';

const MessageSpawner = () => {
  const { globalState } = useGlobal();
  const [messages, setMessages] = useState([]);
  const buffer = [];
  let lastMessageTime = new Date();
  const messageCD = 500; // ms

  const addFloatingMessage = (from, text) => {
    setMessages((prev) => [...prev, { id: Math.random(), from, text }]);
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const spawnMessage = () => {
    if (new Date() - lastMessageTime < messageCD) return;
    const newFloatingMessage = buffer.pop();
    if (!newFloatingMessage) return;
    addFloatingMessage(newFloatingMessage.from, newFloatingMessage.text);
    lastMessageTime = new Date();
    setTimeout(spawnMessage, messageCD + 10);
  };
  const addToBuffer = (from, text) => {
    buffer.unshift({ from, text });
    spawnMessage();
  };

  useEffect(() => {
    // setInterval(spawnMessage, messageCD);
    globalState.websocket.addEventListener('message', (event) => {
      const { action, payload } = JSON.parse(event.data);
      if (action === 'chat') addToBuffer(payload.from, payload.message);
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
