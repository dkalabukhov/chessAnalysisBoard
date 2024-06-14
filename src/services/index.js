import { io } from 'socket.io-client';

const socket = io('wss://felarn.ru', { transports: ['websocket'] });

export default socket;
