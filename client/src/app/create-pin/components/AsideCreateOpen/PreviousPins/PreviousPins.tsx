import { PreviousPin } from '@/app/domain/types/pins-structure';
import ThreePointsMenuCreat from '@/app/interfaces/components/icons/ThreePointsMenuCreat';
import { UseFormReset, FieldValues, UseFormClearErrors } from 'react-hook-form';
import ModalEditPin from '../ModalEditPin';
import usePreviousPins from './usePreviousPins';
import ImageLoaded from './ImageLoaded';

interface PreviousPinInterface {
  elem: PreviousPin;
  reset: UseFormReset<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

const PreviousPins = ({ elem, reset, clearErrors }: PreviousPinInterface) => {
  const {
    handleClickContainer,
    handleImageError,
    handleImageLoad,
    handleClickOpenMenu,
    openModalId,
    setOpenModalId,
    buttonRefs,
    imageLoaded,
    modalRef,
  } = usePreviousPins({ elem, clearErrors });

  return (
    <div
      onClick={handleClickContainer}
      key={elem.id}
      className={`hover:bg-gray-300 border-black p-2 px-3 rounded-lg flex flex-row items-center justify-between dark:bg-slate-800 focus:bg-gray-300 focus:border-[1px] ${
        openModalId === elem.id ? 'border-[1px] bg-gray-300' : ''
      }`}
      tabIndex={0}
    >
      <ImageLoaded
        imageLoaded={imageLoaded}
        handleImageLoad={handleImageLoad}
        handleImageError={handleImageError}
        elem={elem}
      />

      <div className='relative'>
        <button
          ref={(el) => {
            buttonRefs.current[elem.id] = el;
          }}
          className='hover:bg-gray-300 rounded-full p-1 cursor-pointer'
          onClick={(e) => handleClickOpenMenu(elem.id, e)}
        >
          <ThreePointsMenuCreat />
        </button>

        {openModalId === elem.id && (
          <ModalEditPin
            elem={elem}
            modalRef={modalRef}
            setOpenModalId={setOpenModalId}
            reset={reset}
          />
        )}
      </div>
    </div>
  );
};

export default PreviousPins;
