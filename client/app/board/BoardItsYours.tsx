import { useState } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import { DeleteBoardModal } from './DeleteBoardModal';

interface Props {
  boardID: string;
}

export const BoardItsYours = ({ boardID }: Props) => {
  const { t, setDeleteBoardModal, setEditBoardModal } = useAppsStore();

  const handleEditModal = () => setEditBoardModal(boardID);

  const handleDeleteModal = () => setDeleteBoardModal();

  return (
    <>
      <div className='dark:text-white flex flex-col gap-1.5'>
        <span className='text-[13px] px-2'>
          {t?.board.view['more-options']['its-yours'].title ||
            'Opciones de tablero'}
        </span>
        <div className='flex flex-col items-start'>
          <ButtonStyled
            className='text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-900 w-full text-start rounded-lg'
            handleClick={handleEditModal}
          >
            {t?.board.view['more-options']['its-yours'].edit || 'Editar'}
          </ButtonStyled>
          <ButtonStyled
            className='text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-900 w-full text-start rounded-lg'
            handleClick={handleDeleteModal}
          >
            {t?.board.view['more-options']['its-yours'].delete || 'Eliminar'}
          </ButtonStyled>
        </div>
      </div>
    </>
  );
};
