import { PreviousPin } from '../../../../domain/types/pins-structure';
import ThreePointsMenuCreat from '../../../../interfaces/components/icons/ThreePointsMenuCreat';
import { UseFormReset, FieldValues, UseFormClearErrors } from 'react-hook-form';
import ModalEditPin from '../ModalEditPin';
import usePreviousPins from './usePreviousPins';
import ImageLoaded from './ImageLoaded';
import { FullDate } from '../../../../components/Basic/FullDate';
import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';
import { PreviousPinsData } from './PreviousPinsData';

interface PreviousPinInterface {
  elem: PreviousPin;
  reset: UseFormReset<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  lastPin?: boolean;
  editModalOnClick: () => void;
}

const PreviousPins = ({
  elem,
  reset,
  clearErrors,
  lastPin,
  editModalOnClick,
}: PreviousPinInterface) => {
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
      className={`hover:bg-gray-300 w-full border-[1.5px] border-[transparent] p-2 px-3 rounded-lg flex flex-row items-center justify-between dark:bg-slate-800 focus:bg-gray-300 focus:border-black hover:cursor-pointer previous-pins-card transition-colors max-w-[500px] group ${
        openModalId === elem.id ? ' border-black bg-gray-300' : ''
      }`}
      tabIndex={0}
    >
      <div className='flex gap-2 items-center max-h-[60px]'>
        <ImageLoaded
          imageLoaded={imageLoaded}
          handleImageLoad={handleImageLoad}
          handleImageError={handleImageError}
          elem={elem}
        />
        <PreviousPinsData title={elem.title} date={elem.created_at} />
      </div>

      <div className='relative'>
        <button
          ref={(el) => {
            buttonRefs.current[elem.id] = el;
          }}
          className='hover:bg-white rounded-full p-2 w-[40px] h-[40px] flex justify-center items-center cursor-pointer transition-colors'
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
            className={`${lastPin ? 'bottom-full mb-2' : 'top-full mt-2'}`}
            onEditClick={editModalOnClick}
          />
        )}
      </div>
    </div>
  );
};

export default PreviousPins;
