import { FaSave, FaShare, FaThumbtack } from 'react-icons/fa';
import { MobileControllerBtn } from '../MobileControllerBtn';
import { useState } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { FaThumbtackSlash } from 'react-icons/fa6';

export const MobileControllerSaveBtn = () => {
  const [shareColor, setShareColor] = useState('#000000');
  const { mobilePinControllerRotation } = useAppsStore();

  return (
    <MobileControllerBtn
      rotation={mobilePinControllerRotation}
      className=' absolute -top-6 left-[21.5px]'
      setIconColor={setShareColor}
      id='controller-save-btn'
      hoverColor='#e60023'
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
