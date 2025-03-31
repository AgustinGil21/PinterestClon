import { useState } from 'react';
import { MobileControllerBtn } from '../MobileControllerBtn';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';

export const MobileControllerShareBtn = () => {
  const [shareColor, setShareColor] = useState('#000000');
  const {
    mobilePinControllerRotation,
    mobilePinControllerButtonsTranslate,
    closeMobilePinController,
    setMobileControllerSharePinModal,
  } = useAppsStore();
  const { share } = mobilePinControllerButtonsTranslate;

  const handleBtnPress = () => {
    setMobileControllerSharePinModal();
    closeMobilePinController();
  };

  return (
    <MobileControllerBtn
      rotation={mobilePinControllerRotation}
      className=' absolute -top-6 right-[21.5px]'
      setIconColor={setShareColor}
      id='controller-share-btn'
      hoverColor='#e60023'
      onHoverTranslateX={share.x}
      onHoverTranslateY={share.y}
      handleClick={handleBtnPress}
    >
      <svg
        aria-hidden='true'
        className={
          'group-hover:fill-white pointer-events-none transition-transform duration-300'
        }
        height='20'
        role='img'
        viewBox='0 0 24 24'
        width='20'
        style={{
          width: 16,
          height: 16,
          fill: shareColor,
        }}
      >
        <path d='M7.44 5.44a1.5 1.5 0 1 0 2.12 2.12l.94-.94v6.88a1.5 1.5 0 0 0 3 0V6.62l.94.94a1.5 1.5 0 0 0 2.12-2.12l-3.5-3.5a1.5 1.5 0 0 0-2.12 0zM5 13.5a1.5 1.5 0 0 0-3 0v5A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-5a1.5 1.5 0 0 0-3 0v5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z'></path>
      </svg>
    </MobileControllerBtn>
  );
};
