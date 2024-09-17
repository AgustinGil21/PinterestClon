import { PreviousPin } from '@/app/domain/types/pins-structure';
import ThreePointsMenuCreat from '@/app/interfaces/components/icons/ThreePointsMenuCreat';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ModalDeletePin from './ModalEditPin';

interface PreviousPinInterface {
  elem: PreviousPin;
}

const PreviousPins = ({ elem }: PreviousPinInterface) => {
  const { closeDeletePinModal } = useAppsStore();
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

  const handleClickOpenMenu = (id: string) => {
    setOpenModalId(openModalId === id ? null : id);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  return (
    <div
      key={elem.id}
      className={`hover:bg-gray-300 border-black p-2 px-3 rounded-lg flex flex-row items-center justify-between  dark:bg-slate-800 focus:bg-gray-300 focus:border-[1px] ${
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
      {/* <div className='flex justify-start w-full items-start'>
        <p className='text-[12px] text-gray-600 text-start  '>{elem.title}</p>
      </div> */}

      <div className='relative'>
        <button
          ref={(el) => {
            buttonRefs.current[elem.id] = el;
          }}
          className='hover:bg-gray-300 rounded-full p-1 cursor-pointer'
          onClick={() => handleClickOpenMenu(elem.id)}
        >
          <ThreePointsMenuCreat />
        </button>

        {openModalId === elem.id && (
          <ModalDeletePin
            elem={elem}
            modalRef={modalRef}
            setOpenModalId={setOpenModalId}
          />
        )}
      </div>
    </div>
  );
};

export default PreviousPins;
