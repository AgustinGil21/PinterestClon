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

  return (
    <article
      className={`top flex justify-between mt-2 ${
        dynamicModalIsOpen && btnRefStore === btnRef
          ? 'card-controls-modal-open'
          : 'card-controls'
      }`}
    >
      <SavePinBtn
        pinId={elem.pin_id}
        alreadySaved={!!(elem.saved_in_profile || elem.board?.id)}
        savedInProfile={elem.saved_in_profile}
        board={elem.board}
      />
      <SavePinToBoardBtn
        pinBody={elem.body}
        pinId={elem.pin_id}
        btnRef={btnRef}
        board={elem.board}
        savedInProfile={elem.saved_in_profile}
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
