import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { PreviousPin } from '@/app/domain/types/pins-structure';
import { MutableRefObject } from 'react';
import ModalFinnalyDelete from './ModalFinnalyDelete';
import { Dispatch, SetStateAction } from 'react';

interface ModalDeletePinInterface {
  elem: PreviousPin;
  modalRef: MutableRefObject<HTMLDivElement | null>;
  setOpenModalId: Dispatch<SetStateAction<string | null>>;
}

const ModalEditPin = ({
  elem,
  modalRef,
  setOpenModalId,
}: ModalDeletePinInterface) => {
  const { isDeletePinModal, openDeletePinModal, getPinEditId } = useAppsStore();

  const handleClickDeletePin = () => {
    openDeletePinModal();
  };

  const handleClickEditPin = () => {
    getPinEditId(elem.id);
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
