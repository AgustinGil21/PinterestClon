import { useEffect } from 'react';
import { MobileControllerShareBtn } from './mobile-controller-btns/MobileControllerShareBtn';
import { MobileControllerShareWhatsappBtn } from './mobile-controller-btns/MobileControllerShareWhatsappBtn';
import { MobileControllerLikeBtn } from './mobile-controller-btns/MobileControllerLikeBtn';
import { MobileControllerSaveBtn } from './mobile-controller-btns/MobileControllerSaveBtn';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetButtonsTranslateAxis } from '../hooks/useGetButtonsTranslateAxis';
import { MobileControllerCenterCircle } from './mobile-controller-btns/MobileControllerCenterCircle';
import { useGetScreenSize } from '../hooks/useGetScreenSize';

export const MobileController = () => {
  const {
    mobilePinControllerRotation,
    setMobilePinControllerRotation,
    setPinControllerButtonsTranslate,
    mobileSavePinControllerPosition,
  } = useAppsStore();
  const { width } = useGetScreenSize();

  useGetButtonsTranslateAxis({
    rotation: mobilePinControllerRotation,
    setToStore: setPinControllerButtonsTranslate,
  });

  useEffect(() => {
    setMobilePinControllerRotation(45);
  }, []);

  return (
    // { width <= 768 && (
    // ) }

    <div
      className='absolute z-[70]'
      style={{
        transform: 'translate(-65px,-130px)',
      }}
    >
      <article
        className='p-2 w-[130px] h-[130px] rounded-full flex justify-center items-center relative'
        style={{
          rotate: `${mobilePinControllerRotation}deg`,
          top: `${mobileSavePinControllerPosition.y}px`,
          left: `${mobileSavePinControllerPosition.x}px`,
        }}
      >
        <MobileControllerCenterCircle />
        <MobileControllerLikeBtn />
        <MobileControllerSaveBtn />
        <MobileControllerShareBtn />
        <MobileControllerShareWhatsappBtn />
      </article>
    </div>
  );
};
