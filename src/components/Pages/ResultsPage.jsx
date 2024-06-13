import action from '../../services/action';
import useGlobal from '../../services/useGlobal';
import CustomButton from '../ui/CustomButton/CustomButton';

const ResultsPage = () => {
  const { globalState } = useGlobal();
  const resultName = {
    youWon: 'Вы победили',
    youLoose: 'Вы проиграли',
    draw: 'ничья',
  };
  return (
    <div>
      <h1>игра завершилась</h1>
      <p>
        исход:
        {' '}
        {resultName[globalState.result]}
      </p>
      <p>
        причина:
        {' '}
        {globalState.reason}
      </p>
      <CustomButton text="Выйти в главное меню" className="row-btn" onClick={action('leave')} />
    </div>
  );
};
export default ResultsPage;
