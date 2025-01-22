'use client';
import { useEffect, useState } from 'react';
import BoardsListHeader from './BoardsListHeader';
import BoardsListResults, { ListOfBoards } from './BoardsListResults';
import BoardListProfileCard from './BoardListProfileCard';
import PlusIcon from '@/app/components/icons/PlusIcon';
import { BoardsListEmpty } from './BoardsListEmpty';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import CreateBoardModal from '../create-board/CreateBoardModal';

interface Props {
  boards: ListOfBoards[];
}

const BoardsList = ({ boards }: Props) => {
  const [value, setValue] = useState('');
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const {
    isCreateBoardModalOpen,
    updateDataOpenBoardModal,
    setDynamicModal,
    closeDynamicModal,
    createBoardModalOpen,
    getBoardsList,
    getLastBoard,
  } = useAppsStore();

  const handleClick = () => {
    createBoardModalOpen();
    closeDynamicModal();
    getBoardsList();
    getLastBoard();
  };

  useEffect(() => {
    getBoardsList();
  }, []);

  return (
    <>
      <section className='w-full pt-4 flex flex-col items-center'>
        <BoardsListHeader setValue={setValue} lang='es' />
        <section className='w-full flex flex-col text-[0.8rem] gap-4 max-h-[290px] min-h-[290px] overflow-y-auto p-2'>
          <div className='flex w-full flex-col gap-2'>
            {!value && <BoardListProfileCard />}
          </div>
          {boards.length ? (
            <div className='flex w-full flex-col gap-2'>
              {!value ? <h3>Todos los tableros</h3> : <h3>Resultados</h3>}
              {boards.length && (
                <BoardsListResults value={value} boards={boards} />
              )}
            </div>
          ) : (
            <BoardsListEmpty typing={value ? true : false} />
          )}
        </section>
        <footer className='w-full h-[80px]  hover:bg-[#e9e9e9] rounded-b-2xl flex gap-2 items-center cursor-pointer font-semibold  boards-list-shadow hover:shadow-none'>
          <ButtonStyled
            className='flex flex-row items-center gap-3 w-full h-full p-[1rem_0.8rem]'
            handleClick={handleClick}
          >
            <div className='size-[48px] rounded-md flex justify-center items-center bg-[#e9e9e9] '>
              <PlusIcon />
            </div>
            <span className=''>Crear tablero</span>
          </ButtonStyled>
        </footer>
      </section>
    </>
  );
};

export default BoardsList;
