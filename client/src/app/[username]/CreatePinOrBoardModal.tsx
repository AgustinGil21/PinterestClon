'use client';

import { useRouter } from 'next/navigation';
import Modal from '../components/Basic/Modal';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

export const CreatePinOrBoardModal = () => {
  const {
    createPinOrBoardModalIsOpen,
    setCreatePinOrBoardModalIsOpen,
    createPinOrBoardBtnRef,
    createBoardModalOpen,
  } = useAppsStore();

  const router = useRouter();

  const handleCreatePin = () => {
    router.push('/create-pin');
  };

  const handleCreateBoard = () => {
    createBoardModalOpen();
  };

  return (
    <Modal
      props={{
        setModal: setCreatePinOrBoardModalIsOpen,
        isModalOpen: createPinOrBoardModalIsOpen,
        buttonRef: createPinOrBoardBtnRef,
        className:
          'w-[180px] absolute top-[55px] right-0 rounded-2xl md:-left-[65px] cursor-default ',
      }}
    >
      <section className='p-3 shadow-uniform bg-white w-full h-full rounded-2xl flex flex-col gap-1.5'>
        <h2 className='text-xs self-start ml-[8px]'>Crear</h2>
        <article className='w-full flex flex-col items-start font-medium'>
          <button
            onClick={handleCreatePin}
            className='hover:bg-slate-200 w-full self-start py-[5px] px-[8px] rounded-lg flex items-start'
          >
            <span>Pin</span>
          </button>
          <button
            onClick={handleCreateBoard}
            className='hover:bg-slate-200 w-full self-start py-[5px] px-[8px] rounded-lg flex items-start'
          >
            <span>Tablero</span>
          </button>
        </article>
      </section>
    </Modal>
  );
};
