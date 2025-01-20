import Tooltip from '@/app/components/Header/ToolTip';
import ThreePointsIcon from '@/app/interfaces/components/icons/ThreePointsIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRef } from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ModalPlusOptionPin from './ModalPlusOptionPin';

const PlusOptionsPin = () => {
  const {
    isThreePointsAccountOpen,
    openThreePointsAcountModal,
    pinData,
    isAuth,
    openRegisterModal,
  } = useAppsStore();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    openThreePointsAcountModal();
  };

  return (
    <>
      <Tooltip tooltipText='Más opciones'>
        <ButtonStyled btnRef={btnRef} className='!p-0'>
          <div
            onClick={handleClick}
            className={`p-2 rounded-full cursor-pointer ${
              isThreePointsAccountOpen
                ? 'bg-black hover:bg-black'
                : 'hover:bg-gray-200'
            }`}
          >
            <ThreePointsIcon
              isThreePointsAccountOpen={isThreePointsAccountOpen}
            />
          </div>
        </ButtonStyled>
      </Tooltip>

      {isThreePointsAccountOpen && (
        <div className='relative'>
          {' '}
          <ModalPlusOptionPin btnRef={btnRef} />{' '}
        </div>
      )}
    </>
  );
};

export default PlusOptionsPin;
