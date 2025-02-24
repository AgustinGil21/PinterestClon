import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MobileControllerBtn } from '../MobileControllerBtn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const MobileControllerShareWhatsappBtn = () => {
  const [shareColor, setShareColor] = useState('#000000');
  const { mobilePinControllerRotation } = useAppsStore();

  return (
    <MobileControllerBtn
      rotation={mobilePinControllerRotation}
      className=' absolute top-2 -right-3'
      setIconColor={setShareColor}
      id='controller-share-wsp-btn'
      hoverColor='#65bc40'
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
