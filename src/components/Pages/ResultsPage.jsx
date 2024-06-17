// import action from '../../services/action';
import sendAction from '../../services/sendAction';
import useGlobal from '../../services/useGlobal';
import CustomButton from '../ui/CustomButton/CustomButton';

const ResultsPage = () => {
  const { globalState } = useGlobal();
  const resultName = {
    youWon: 'Вы победили',
    youLoose: 'Вы проиграли',
    draw: 'Ничья',
  };
  return (
    <div>
      <h1>Игра завершилась</h1>
      <p>
        Исход:
        {' '}
        {resultName[globalState.result]}
      </p>
      <p>
        Причина:
        {' '}
        {globalState.reason}
      </p>
      <CustomButton text="Выйти в главное меню" className="row-btn" onClick={() => { sendAction(globalState.websocket, 'leave'); window.location.reload(); }} />
    </div>
  );
};
export default ResultsPage;
