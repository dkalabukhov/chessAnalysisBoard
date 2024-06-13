import { useContext } from 'react';
import { GlobalContext } from '../components/modules/WSConnection';

const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
export default useGlobal;
