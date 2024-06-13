import useGlobal from '../../services/useGlobal';

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
    </div>
  );
};
export default ResultsPage;
