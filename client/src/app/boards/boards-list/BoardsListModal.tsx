import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import BoardsList from './BoardsList';
import { DynamicModal } from '@/app/components/Basic/DynamicModal';

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
  handleModalOpen: () => void;
  isOpen: boolean;
}

const BoardsListModal = ({ btnRef, handleModalOpen, isOpen }: Props) => {
  const { boardsList } = useAppsStore();

  const boards = [
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
    {
      id: '3',
      collage: [
        'https://i.pinimg.com/474x/d5/a3/4b/d5a34b4472ca79ebaa8390e84e7d1668.jpg',
      ],
      name: 'Color palette',
    },
  ];

  return (
    <DynamicModal
      className='w-[360px] rounded-2xl bg-white'
      btnRef={btnRef}
      handleModalOpen={handleModalOpen}
      isOpen={isOpen}
    >
      <BoardsList boards={boards} />
    </DynamicModal>
  );
};

export default BoardsListModal;
