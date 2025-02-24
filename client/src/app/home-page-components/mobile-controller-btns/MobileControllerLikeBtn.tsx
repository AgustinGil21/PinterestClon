import { useState } from 'react';
import { FaHeart, FaShare } from 'react-icons/fa';
import { MobileControllerBtn } from '../MobileControllerBtn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const MobileControllerLikeBtn = () => {
  const [shareColor, setShareColor] = useState('#000000');
  const { mobilePinControllerRotation } = useAppsStore();

  return (
    <MobileControllerBtn
      rotation={mobilePinControllerRotation}
      className=' absolute top-2 -left-3'
      setIconColor={setShareColor}
      id='controller-like-btn'
      hoverColor='#e60023'
    >
      <FaHeart
        size={14}
        className='group-hover:fill-white pointer-events-none transition-transform duration-300'
        style={{
          fill: shareColor,
        }}
      />
    </MobileControllerBtn>
  );
};
