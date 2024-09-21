import { PreviousPin } from '@/app/domain/types/pins-structure';
import ThreePointsMenuCreat from '@/app/interfaces/components/icons/ThreePointsMenuCreat';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { UseFormReset, FieldValues, UseFormClearErrors } from 'react-hook-form';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ModalEditPin from './ModalEditPin';

interface PreviousPinInterface {
  elem: PreviousPin;
  reset: UseFormReset<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

const PreviousPins = ({ elem, reset, clearErrors }: PreviousPinInterface) => {
  const {
    closeDeletePinModal,
    getPinEditId,
    updateStateCreatePin,
    dataCreatePin,
  } = useAppsStore();
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !Object.values(buttonRefs.current).some(
          (ref) => ref && ref.contains(event.target as Node)
        )
      ) {
        setOpenModalId(null);
        closeDeletePinModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDeletePinModal]);

  const handleClickOpenMenu = (id: string, e: any) => {
    e.stopPropagation();
    setOpenModalId(openModalId === id ? null : id);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  const handleClickContainer = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (
      !Object.values(buttonRefs.current).some(
        (ref) => ref && ref.contains(e.target as Node)
      )
    )
      await getPinEditId(elem.id);

    clearErrors();
  };

  return (
    <div
      onClick={handleClickContainer}
      key={elem.id}
      className={`hover:bg-gray-300 border-black p-2 px-3 rounded-lg flex flex-row items-center justify-between dark:bg-slate-800 focus:bg-gray-300 focus:border-[1px] ${
        openModalId === elem.id ? 'border-[1px] bg-gray-300' : ''
      }`}
      tabIndex={0}
    >
      <div className='relative w-[60px] h-[60px]'>
        {!imageLoaded && (
          <div className='absolute inset-0 bg-gray-400 rounded-2xl'></div>
        )}
        <Image
          fill
          className='rounded-2xl object-cover'
          src={elem.body || ''}
          alt='imagen-editar'
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
        />
      </div>

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
