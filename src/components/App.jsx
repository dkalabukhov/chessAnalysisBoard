// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LobbyPage from './Pages/LobbyPage';
import PlayRoomPage from './Pages/PlayRoomPage';
import useGlobal from '../services/useGlobal';
import NoConnectionPage from './Pages/NoConnectionPage';
import ResultsPage from './Pages/ResultsPage';
import MessageSpawner from './ui/MessageSpawner/MessageSpawner';
import CustomButton from './ui/CustomButton/CustomButton';
import action from '../services/action';

const App = () => {
  const { globalState } = useGlobal();
  // console.log(globalState.userCondition);
  console.log('=== new State ===');
  console.log(globalState);
  const pages = {
    outOfGame: <HomePage />,
    inLobby: <LobbyPage />,
    inGame: [<PlayRoomPage />, <CustomButton text="выйти" onClick={action('leave')} />],
    onResultScreen: <ResultsPage />,
  };

  return (
    globalState.connectionStatus === 'online' && globalState.userCondition
      ? (
        <>
          {pages[globalState.userCondition]}
          <MessageSpawner />
        </>
      )
      : <NoConnectionPage />

  );
};
export default App;
