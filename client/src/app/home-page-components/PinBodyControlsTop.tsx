import { useRef } from 'react';
import { PinInterface } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

export const PinBodyControlsTop = ({ elem }: { elem: PinInterface }) => {
  const {
    lastBoard,
    updateDataOpenBoardModal,
    setDynamicModal,
    dynamicModalIsOpen,
    btnRef: btnRefStore,
    addPinToBoard,
    savePinToProfile,
  } = useAppsStore();

  const btnRef = useRef(null);

  const handleModalOpen = () => {
    if (elem.pin_id) updateDataOpenBoardModal(elem.pin_id, elem.body);

    setDynamicModal(btnRef);
  };

  const handleSavePin = () => {
    if (!elem.pin_id) return;

    if (lastBoard.id) {
      addPinToBoard({ pinId: elem.pin_id, boardId: lastBoard.id });
    } else {
      savePinToProfile(elem.pin_id);
    }
  };

  return (
    <article
      className={`top flex justify-between mt-2 ${
        dynamicModalIsOpen && btnRefStore === btnRef
          ? 'card-controls-modal-open'
          : 'card-controls'
      }`}
    >
      <button
        className='save-button bg-red-500 text-white px-3 py-1 rounded'
        onClick={handleSavePin}
      >
        Guardar
      </button>
      <button
        className='save-to-board-button flex items-center'
        onClick={handleModalOpen}
        ref={btnRef}
      >
        <span className='text-sm'>{lastBoard.name || 'Perfil'}</span>
        <svg
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-4 h-4 ml-1'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          />
        </svg>
      </button>
      <button className='hidden transition-[colors,scale] save-to-board-button-sm p-3 rounded-full bg-transparent justify-center items-center '>
        <svg
          fill='none'
          viewBox='0 0 20 20'
          strokeWidth='2'
          stroke='white'
          className='w-4 h-4 -translate-x-0.5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          />
        </svg>
      </button>
    </article>
  );
};
