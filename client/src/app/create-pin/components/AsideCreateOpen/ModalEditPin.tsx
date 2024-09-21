import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { PreviousPin } from '@/app/domain/types/pins-structure';
import { MutableRefObject } from 'react';
import ModalFinnalyDelete from './ModalFinnalyDelete';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReset, FieldValues } from 'react-hook-form';

interface ModalDeletePinInterface {
  elem: PreviousPin;
  modalRef: MutableRefObject<HTMLDivElement | null>;
  setOpenModalId: Dispatch<SetStateAction<string | null>>;
  reset: UseFormReset<FieldValues>;
}

const ModalEditPin = ({
  elem,
  modalRef,
  reset,
  setOpenModalId,
}: ModalDeletePinInterface) => {
  const {
    isDeletePinModal,
    openDeletePinModal,
    getPinEditId,
    closeDeletePinModal,
    updateStateCreatePin,
  } = useAppsStore();

  const handleClickDeletePin = () => {
    openDeletePinModal();
  };

  const handleClickEditPin = () => {
    closeDeletePinModal();
    updateStateCreatePin('title', '');
    updateStateCreatePin('alt_text', '');
    updateStateCreatePin('description', '');
    updateStateCreatePin('url', '');
    updateStateCreatePin('adult_content', false);
    updateStateCreatePin('topics', '');
    getPinEditId(elem.id);
    reset();
    setOpenModalId(null);
  };

  return (
    <>
      <div
        ref={modalRef}
        className='absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-uniform  z-10'
      >
        <div className='flex flex-col justify-start items-start gap-1 font-semibold p-1.5 rounded-xl'>
          <ButtonStyled
            handleClick={handleClickEditPin}
            disabled={false}
            className='hover:bg-gray-200 rounded-lg text-xs w-full text-start'
          >
            Editar
          </ButtonStyled>
          <ButtonStyled
            disabled={false}
            handleClick={handleClickDeletePin}
            className='hover:bg-gray-200 rounded-lg  text-xs w-full text-start'
          >
            Eliminar
          </ButtonStyled>
        </div>
      </div>
      {isDeletePinModal && (
        <ModalFinnalyDelete
          modalRef={modalRef}
          elem={elem}
          setOpenModalId={setOpenModalId}
        />
      )}
    </>
  );
};

export default ModalEditPin;
