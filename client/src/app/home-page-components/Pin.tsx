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
    openThreePointsAcountModal,
    isThreePointsAccountOpen,
  } = useAppsStore();
  const { pinBody, pinId } = dataOpenBoardModal;
  const btnThreePoints = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = elem.body;
    img.onload = () => setIsLoaded(true);
  }, [elem.body]);

  const handleClickOpenModalThreePoints = () => {
    if (!isAuth) {
      openRegisterModal();
    }
    openThreePointsAcountModal();
  };

  return (
    <>
      <section className={`${elem.className} ${className} relative`}>
        {!isLoaded && elem.username ? (
          <PinSkeleton />
        ) : (
          <article className='card hover:cursor-pointer'>
            <PinBody elem={elem} />
            {elem.username && <PinFooter elem={elem} />}
          </article>
        )}
        {isThreePointsAccountOpen && (
          <ModalPlusOptionPin
            body={elem.body}
            btnRef={btnThreePoints}
            setModal={handleClickOpenModalThreePoints}
            isModalOpen={isThreePointsAccountOpen}
            styles={{
              right: '0',
              bottom: '7px',
            }}
            its_yours={elem.username === userPublicData?.username}
          />
        )}
      </section>
      {isCreateBoardModalOpen && elem.pin_id === pinId && (
        <CreateBoardModal pinBody={pinBody} pinId={pinId} />
      )}
    </>
  );
};
