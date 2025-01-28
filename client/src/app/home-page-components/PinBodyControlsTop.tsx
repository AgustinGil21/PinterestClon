import { useRef } from 'react';
import { PinInterface } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { SavePinBtn } from './SavePinBtn';
import { SavePinToBoardBtn } from './SavePinToBoardBtn';

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

  // const handleModalOpen = () => {
  //   if (elem.pin_id) updateDataOpenBoardModal(elem.pin_id, elem.body);

  //   setDynamicModal(btnRef);
  // };

  // const handleSavePin = () => {
  //   if (!elem.pin_id) return;

  //   if (lastBoard.id) {
  //     addPinToBoard({ pinId: elem.pin_id, boardId: lastBoard.id });
  //   } else {
  //     savePinToProfile(elem.pin_id);
  //   }
  // };

  return (
    <article
      className={`top flex justify-between mt-2 ${
        dynamicModalIsOpen && btnRefStore === btnRef
          ? 'card-controls-modal-open'
          : 'card-controls'
      }`}
    >
      {/* <button
        className='p-[0_1.5rem] h-[45px] save-button rounded-[24px] text-white bg-[#e60023] font-bold transition-colors hover:bg-[#b6031e]'
        onClick={handleSavePin}
      >
        Guardar
      </button> */}
      <SavePinBtn pinId={elem.pin_id} />
      {/* <button
        className='save-to-board-button flex items-center justify-center h-[45px] p-[0_1rem] w-fit max-w-[110px] font-bold text-white bg-[rgba(0,0,0,0)] rounded-[24px] g-[0.3rem] transition-[colors,transform] hover:bg-[rgba(0,0,0,0.2)] focus:bg-black focus:scale-[1.06]'
        onClick={handleModalOpen}
        ref={btnRef}
      >
        <span className='text-sm overflow-hidden whitespace-nowrap text-ellipsis'>
          {lastBoard.name || 'Perfil'}
        </span>
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
      </button> */}
      <SavePinToBoardBtn
        pinBody={elem.body}
        pinId={elem.pin_id}
        btnRef={btnRef}
      />
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
