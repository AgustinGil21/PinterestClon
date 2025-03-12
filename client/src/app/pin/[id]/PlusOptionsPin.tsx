import Tooltip from '@/app/components/Header/ToolTip';
import ThreePointsIcon from '@/app/interfaces/components/icons/ThreePointsIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRef } from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ModalPlusOptionPin from './ModalPlusOptionPin';
import ModalReport from './ModalReport';

const PlusOptionsPin = () => {
  const {
    isThreePointsAccountOpen,
    openThreePointsAcountModal,
    pinData,
    isAuth,
    isOpenReportModal,
    openRegisterModal,
    userPublicData,
    t,
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
      {/* <Tooltip tooltipText={t?.pin['more-options'].tooltip || 'Más opciones'}> */}
      <ButtonStyled btnRef={btnRef} className='!p-0'>
        <div
          onClick={handleClick}
          className={`p-2 rounded-full cursor-pointer flex items-center ${
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
      {/* </Tooltip> */}

      {isThreePointsAccountOpen && (
        <div className='relative'>
          <ModalPlusOptionPin
            body={pinData.body}
            btnRef={btnRef}
            isModalOpen={isThreePointsAccountOpen}
            setModal={openThreePointsAcountModal}
            styles={{
              top: '10px',
              left: '0',
            }}
            its_yours={pinData.username === userPublicData?.username}
          />
        </div>
      )}
      {isOpenReportModal && <ModalReport />}
    </>
  );
};

export default PlusOptionsPin;
