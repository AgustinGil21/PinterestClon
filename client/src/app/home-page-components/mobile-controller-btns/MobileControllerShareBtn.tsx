import { FaShare } from 'react-icons/fa';
import { MobileControllerBtn } from '../MobileControllerBtn';
import { useState } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const MobileControllerShareBtn = () => {
  const [shareColor, setShareColor] = useState('#000000');
  const { mobilePinControllerRotation } = useAppsStore();

  return (
    <MobileControllerBtn
      rotation={mobilePinControllerRotation}
      className=' absolute -top-6 right-[21.5px]'
      setIconColor={setShareColor}
      id='controller-share-btn'
      hoverColor='#e60023'
    >
      <FaShare
        size={14}
        className='group-hover:fill-white pointer-events-none transition-transform duration-300'
        style={{
          fill: shareColor,
        }}
      />
    </MobileControllerBtn>
  );
};
