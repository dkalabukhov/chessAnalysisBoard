import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LobbyPage from './Pages/LobbyPage';
import PlayRoomPage from './Pages/PlayRoomPage';
// import socket from '../services';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="lobby" element={<LobbyPage />} />
      <Route path="lobby/playroom" element={<PlayRoomPage />} />
    </Routes>
  </BrowserRouter>
);
export default App;
