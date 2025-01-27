import { useState, useEffect, useRef } from 'react';
import { PinInterface } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import CreateBoardModal from '../boards/create-board/CreateBoardModal';
import ModalPlusOptionPin from '../pin/[id]/ModalPlusOptionPin';
import { PinFooter } from './PinFooter';
import { PinBody } from './PinBody';
import { PinSkeleton } from '../skeletons/PinSkeleton';

interface PinProps {
  elem: PinInterface;
  className?: string;
}

export const Pin = ({ elem, className }: PinProps) => {
  const {
    dataOpenBoardModal,
    isCreateBoardModalOpen,
    isAuth,
    openRegisterModal,
    userPublicData,
    isPinMoreOptionModalOpen,
    closePinMoreOptionsModal,
    pinMoreOptionsBtnRef,
  } = useAppsStore();
  const { pinBody, pinId } = dataOpenBoardModal;
  const [isLoaded, setIsLoaded] = useState(false);
  const [openModalThreePoints, setOpenModalThreePoints] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = elem.body;
    img.onload = () => setIsLoaded(true);
  }, [elem.body]);

  const handleClickOpenModalThreePoints = () => {
    if (!isAuth) {
      openRegisterModal();
    }
    setOpenModalThreePoints(!openModalThreePoints);
  };

  return (
    <>
      <section className={`${elem.className} ${className}`}>
        {!isLoaded && elem.username ? (
          <PinSkeleton />
        ) : (
          <article className='card hover:cursor-pointer'>
            <PinBody elem={elem} />
            {elem.username && <PinFooter elem={elem} />}
          </article>
        )}
      </section>
      {isCreateBoardModalOpen && elem.pin_id === pinId && (
        <CreateBoardModal pinBody={pinBody} pinId={pinId} />
      )}
    </>
  );
};
