import { Table } from 'antd';
import sendAction from '../../../services/sendAction';
import useGlobal from '../../../services/useGlobal';

const CustomTable = ({ columns, data }) => {
  const { globalState } = useGlobal();
  const onRowClick = (record, rowIndex) => ({
    onClick: (event) => {
      // console.log(`Подключение к ID: ${record.gameID}`);
      sendAction(globalState.websocket, 'join', { gameID: record.gameID });
    },
  });
  return (

    <Table columns={columns} dataSource={data} onRow={onRowClick} bordered />
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
