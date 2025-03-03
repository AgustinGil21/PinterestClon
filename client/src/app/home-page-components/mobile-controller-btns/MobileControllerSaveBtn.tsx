import { useState } from 'react';
import { FaThumbtack } from 'react-icons/fa';
import { MobileControllerBtn } from '../MobileControllerBtn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const MobileControllerSaveBtn = () => {
  const [shareColor, setShareColor] = useState('#000000');
  const {
    mobilePinControllerRotation,
    mobilePinControllerButtonsTranslate,
    closeMobilePinController,
    setMobileControllerBoardsListModalIsOpen,
    mobileControllerPinID,
  } = useAppsStore();
  const { save } = mobilePinControllerButtonsTranslate;

  const handleBtnPress = () => {
    setMobileControllerBoardsListModalIsOpen(mobileControllerPinID);
    closeMobilePinController();
  };

  return (
    <MobileControllerBtn
      rotation={mobilePinControllerRotation}
      className=' absolute -top-6 left-[21.5px]'
      setIconColor={setShareColor}
      id='controller-save-btn'
      hoverColor='#e60023'
      onHoverTranslateY={save.y}
      onHoverTranslateX={save.x}
      handleClick={handleBtnPress}
    >
      <FaThumbtack
        size={14}
        className='group-hover:fill-white pointer-events-none transition-transform duration-300 rotate-45'
        style={{
          fill: shareColor,
        }}
      />
    </MobileControllerBtn>
  );
};
