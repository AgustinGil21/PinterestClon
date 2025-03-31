import ModalStyled from '../../../interfaces/components/Basic/ModalStyled';
import ButtonStyled from '../../../interfaces/components/Basic/ButtonStyled';
import { MutableRefObject } from 'react';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { PreviousPin } from '../../../domain/types/pins-structure';
import { Dispatch, SetStateAction } from 'react';

interface ModalFinnalyDeleteInterface {
  modalRef: MutableRefObject<HTMLDivElement | null>;
  elem: PreviousPin;
  setOpenModalId: Dispatch<SetStateAction<string | null>>;
}

const ModalFinnalyDelete = ({
  modalRef,
  elem,
  setOpenModalId,
}: ModalFinnalyDeleteInterface) => {
  const {
    deletePreviousPin,
    closeDeletePinModal,
    setShouldReload,
    setImagePreview,
    t,
  } = useAppsStore();
  const handleClick = () => {
    setOpenModalId(null);
    closeDeletePinModal();
  };

  const handleClickDelete = async (id: string) => {
    console.log(id);
    await deletePreviousPin(id);
    setImagePreview(null);

    setShouldReload();
    closeDeletePinModal();
  };

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <ModalStyled
        classProps='relative z-50 max-w-[395px] px-6 bg-white py-6 bottom-5 shadow-lg rounded-[24px] flex flex-col items-center gap-6'
        modalRef={modalRef}
      >
        <div className='text-2xl font-semibold text-center dark:text-white'>
          {t?.['create-pin']['delete-modal'].title ||
            '¿Quieres eliminar la publicación?'}
        </div>
        <p className='text-sm text-center dark:text-white'>
          {t?.['create-pin']['delete-modal'].description ||
            'Se perderán todas las interacciones asociadas, como comentarios, me gusta o compartidos.'}
        </p>
        <div className='flex flex-row gap-3 w-full'>
          <ButtonStyled
            disabled={false}
            handleClick={handleClick}
            className='bg-buttonGreyBg  text-black font-semibold w-full hover:bg-gray-300'
          >
            {t?.['create-pin']['delete-modal'].cancel || 'Cancelar'}
          </ButtonStyled>
          <ButtonStyled
            disabled={false}
            handleClick={() => handleClickDelete(elem.id)}
            className='bg-redPinterestBg text-white font-semibold w-full hover:bg-red-800'
          >
            {t?.['create-pin']['delete-modal'].delete || 'Eliminar'}
          </ButtonStyled>
        </div>
      </ModalStyled>
    </div>
  );
};

export default ModalFinnalyDelete;
