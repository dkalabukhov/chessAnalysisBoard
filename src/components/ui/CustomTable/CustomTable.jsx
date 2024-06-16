import { Table } from 'antd';
import sendAction from '../../../services/sendAction';
import useGlobal from '../../../services/useGlobal';
import action from '../../../services/action';
import CustomButton from '../CustomButton/CustomButton';

const CustomTable = ({ columns, data, newGameName }) => {
  const { globalState } = useGlobal();
  const onRowClick = (record, rowIndex) => ({
    onClick: (event) => {
      // console.log(`Подключение к ID: ${record.gameID}`);
      sendAction(globalState.websocket, 'join', { gameID: record.gameID });
    },
  });
  return (

    <Table
      pagination={{ defaultPageSize: 5 }}
      columns={columns}
      dataSource={data}
      onRow={onRowClick}
      bordered
      locale={{
        emptyText: <>
          <p> Нет открытых комнат. </p>
          <p>Но вы може создать свою.</p>
          <CustomButton text="Создать" className="row-btn" onClick={action('createGame', newGameName ? { gameName: newGameName } : null)} />
                   </>,
      }}
    />
  );
};

export default CustomTable;

// const mockData = [
//   {
//     key: '1',
//     gameID: '1',
//     gameName: 'комната 1',
//     hostName: 'игрок10',
//     playerCount: 2,
//   },

//   {
//     key: '2',
//     gameID: '2',
//     gameName: 'комната 2',
//     hostName: 'игрок5',
//     playerCount: 5,
//   },
//   {
//     key: '3',
//     gameID: '3',
//     gameName: 'комната 3',
//     hostName: 'игрок13',
//     playerCount: 3,
//   },
// ];
