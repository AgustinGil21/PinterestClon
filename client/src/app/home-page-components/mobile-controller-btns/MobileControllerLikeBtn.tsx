import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MobileControllerBtn } from '../MobileControllerBtn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const MobileControllerLikeBtn = () => {
  const [shareColor, setShareColor] = useState('#000000');
  const [isHovered, setIsHovered] = useState(false);
  const { mobilePinControllerRotation, mobilePinControllerButtonsTranslate } =
    useAppsStore();
  const { like } = mobilePinControllerButtonsTranslate;

  return (
    <MobileControllerBtn
      rotation={mobilePinControllerRotation}
      className=' absolute top-2 -left-3'
      setIconColor={setShareColor}
      id='controller-like-btn'
      hoverColor='#e60023'
      onHoverTranslateX={like.x}
      onHoverTranslateY={like.y}
      setIsHovered={setIsHovered}
    >
      {isHovered ? (
        <FaHeart
          size={14}
          className='group-hover:fill-white pointer-events-none transition-transform duration-300'
          style={{
            fill: shareColor,
          }}
        />
      ) : (
        <FaRegHeart
          size={14}
          className='group-hover:fill-white pointer-events-none transition-transform duration-300'
          style={{
            fill: shareColor,
          }}
        />
      )}
    </MobileControllerBtn>
  );
};
