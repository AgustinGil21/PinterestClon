'use client';

import Masonry from '@/app/interfaces/components/Basic/Masonry';
import { BoardHeader } from '../BoardHeader';
import { BoardGoBackBtn } from '../BoardGoBackBtn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { DeleteBoardModal } from '../DeleteBoardModal';
import { EditBoardModal } from '@/app/boards/edit-board/EditBoardModal';

interface IParams {
  id: string;
}

interface Props {
  params: IParams;
}

const BoardPage = ({ params }: Props) => {
  const { deleteBoardModalIsOpen, setDeleteBoardModal, editBoardModalIsOpen } =
    useAppsStore();
  const { id }: IParams = params;

  const board = {
    id: '1234',
    name: 'Messi Board',
    description:
      'El mejor board de Messi, la historia lo recordará por siempre como el mejor jugador del mundo. Este board es una conmemoración a su carrera como jugador, mostrando momentos claves que lo llevan a ser lo que es hoy.',
    pins_count: '43',
    its_yours: true,
    user: {
      id: 'aa1234',
      name: 'Pablo',
      surname: 'Gutierrez',
      username: 'PablitoGuti123',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRUXngqq-hskwEuvR9D_P1GHCGg2WfXDG7No8rx6n4BumkmW4UgbhHvxOsuq6bEZrB34&usqp=CAU',
      avatar_letter_color: '#fff',
      avatar_letter: 'P',
      avatar_background: '#09f',
    },
  };

  return (
    <section className='w-full relative h-full min-h-[90dvh]'>
      {deleteBoardModalIsOpen && (
        <DeleteBoardModal
          setModal={setDeleteBoardModal}
          modalIsOpen={deleteBoardModalIsOpen}
          boardID={board.id}
        />
      )}
      {editBoardModalIsOpen && <EditBoardModal />}
      <BoardHeader board={board} />
      <Masonry></Masonry>
    </section>
  );
};

export default BoardPage;
