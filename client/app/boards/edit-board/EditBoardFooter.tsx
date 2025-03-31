import { useAppsStore } from '../../infrastructure/stores/useAppStore';

export const EditBoardFooter = () => {
  const { setEditBoardModal, editBoardID, t } = useAppsStore();

  const handleCloseModal = () => {
    setEditBoardModal(editBoardID);
  };

  return (
    <footer className='border-solid border-t border-[#cdcdcd] w-full p-2 flex items-center justify-between'>
      <button
        className='p-2 bg-[#e9e9e9] rounded-2xl text-black font-bold text-[0.7rem] hover:bg-gray-300 transition-colors min-w-[67px]'
        onClick={handleCloseModal}
      >
        {t?.board.edit.buttons.cancel || 'Cancelar'}
      </button>
      <button
        className='p-2 bg-[#e60023] rounded-2xl text-white font-bold text-[0.7rem] hover:bg-[#b60000] transition-colors min-w-[67px]'
        type='submit'
        form='editBoardModalForm'
      >
        {t?.board.edit.buttons.save || 'Guardar'}
      </button>
    </footer>
  );
};
