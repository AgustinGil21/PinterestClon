import BoardCoverModal from '../boards/board-cover/BoardCoverModal';
import BoardsList from '../boards/boards-list/BoardsList';
import BoardsListModal from '../boards/boards-list/BoardsListModal';

export default function Test() {
  const board = [
    {
      id: '1',
      cover:
        'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg.webp',
      name: 'Perros',
    },
    {
      id: '2',
      cover:
        'https://concepto.de/wp-content/uploads/2020/08/Programacion-informatica-scaled-e1724960033513.jpg',
      name: 'Programación',
    },
  ];

  return (
    <>
      {/* <BoardCoverModal /> */}
      <BoardsListModal boards={board} />
    </>
  );
}
