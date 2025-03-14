'use client';

import Masonry from '@/app/interfaces/components/Basic/Masonry';
import { BoardHeader } from '../BoardHeader';
import { BoardGoBackBtn } from '../BoardGoBackBtn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { DeleteBoardModal } from '../DeleteBoardModal';
import { EditBoardModal } from '@/app/boards/edit-board/EditBoardModal';
import { useEffect } from 'react';
import { PinInterface } from '@/app/domain/types/pins-structure';
import { Pin } from '@/app/home-page-components/Pin';
import { changeDocTitle } from '@/app/libs/changeDocTitle';

interface IParams {
  id: string;
}

interface Props {
  params: IParams;
}

const BoardPage = ({ params }: Props) => {
  const {
    deleteBoardModalIsOpen,
    setDeleteBoardModal,
    editBoardModalIsOpen,
    getBoard,
    board,
    boardPins,
  } = useAppsStore();
  const { id }: IParams = params;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        await getBoard({ id, page: 1, limit: 100 });
      } catch (err) {
        console.log('Error al obtener el tablero:', err);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    changeDocTitle(board.name);
  }, [board]);

  return (
    <section className='w-full relative h-full min-h-[90dvh] flex flex-col gap-4'>
      {deleteBoardModalIsOpen && (
        <DeleteBoardModal
          setModal={setDeleteBoardModal}
          modalIsOpen={deleteBoardModalIsOpen}
          boardID={board.id}
        />
      )}
      {editBoardModalIsOpen && <EditBoardModal />}
      <BoardHeader board={board} />
      <Masonry>
        {boardPins.map((pin: PinInterface) => (
          <Pin elem={pin} key={pin.pin_id} />
        ))}
      </Masonry>
    </section>
  );
};

export default BoardPage;
