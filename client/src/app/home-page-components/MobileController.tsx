import { MobileControllerShareBtn } from './mobile-controller-btns/MobileControllerShareBtn';
import { MobileControllerShareWhatsappBtn } from './mobile-controller-btns/MobileControllerShareWhatsappBtn';
import { MobileControllerLikeBtn } from './mobile-controller-btns/MobileControllerLikeBtn';
import { MobileControllerSaveBtn } from './mobile-controller-btns/MobileControllerSaveBtn';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetButtonsTranslateAxis } from '../hooks/useGetButtonsTranslateAxis';
import { MobileControllerCenterCircle } from './mobile-controller-btns/MobileControllerCenterCircle';
import { useLockScroll } from '../hooks/useLockScroll';

export const MobileController = () => {
  const {
    mobilePinControllerRotation,
    setPinControllerButtonsTranslate,
    mobileSavePinControllerPosition,
    closeMobilePinController,
  } = useAppsStore();

  useLockScroll();

  useGetButtonsTranslateAxis({
    rotation: mobilePinControllerRotation,
    setToStore: setPinControllerButtonsTranslate,
  });

  return (
    <>
      <div
        className='fixed inset-0 bg-black bg-opacity-50 z-[70]'
        onClick={closeMobilePinController}
      />
      <div
        className='absolute z-[90]'
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
    </>
  );
};
