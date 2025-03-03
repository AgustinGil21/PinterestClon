import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MobileControllerBtn } from '../MobileControllerBtn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const MobileControllerShareWhatsappBtn = () => {
  const [shareColor, setShareColor] = useState('#000000');
  const {
    mobilePinControllerRotation,
    mobilePinControllerButtonsTranslate,
    closeMobilePinController,
    mobileControllerPinID,
  } = useAppsStore();
  const { shareWsp } = mobilePinControllerButtonsTranslate;
  const url = `https://pinterestClon.com/pin/${mobileControllerPinID}`;
  const wspURL = `https://wa.me/?text=${encodeURIComponent(url)}`;

  const handleBtnPress = () => {
    window.open(wspURL, '_blank');
    closeMobilePinController();
  };

  return (
    <MobileControllerBtn
      rotation={mobilePinControllerRotation}
      className=' absolute top-2 -right-3'
      setIconColor={setShareColor}
      id='controller-share-wsp-btn'
      hoverColor='#65bc40'
      onHoverTranslateX={shareWsp.x}
      onHoverTranslateY={shareWsp.y}
      handleClick={handleBtnPress}
    >
      <FaWhatsapp
        size={18}
        className='group-hover:fill-white pointer-events-none transition-transform duration-300'
        style={{
          fill: shareColor,
        }}
      />
    </MobileControllerBtn>
  );
};
