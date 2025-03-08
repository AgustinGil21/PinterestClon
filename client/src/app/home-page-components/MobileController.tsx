import { useEffect } from 'react';
import { MobileControllerShareBtn } from './mobile-controller-btns/MobileControllerShareBtn';
import { MobileControllerShareWhatsappBtn } from './mobile-controller-btns/MobileControllerShareWhatsappBtn';
import { MobileControllerLikeBtn } from './mobile-controller-btns/MobileControllerLikeBtn';
import { MobileControllerSaveBtn } from './mobile-controller-btns/MobileControllerSaveBtn';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetButtonsTranslateAxis } from '../hooks/useGetButtonsTranslateAxis';
import { MobileControllerCenterCircle } from './mobile-controller-btns/MobileControllerCenterCircle';
import { useLockScroll } from '../hooks/useLockScroll';
import { MobileControllerFilter } from './MobileControllerFilter';
import { useMobileHover } from '../hooks/useMobileHover';

export const MobileController = () => {
  const {
    mobilePinControllerRotation,
    setPinControllerButtonsTranslate,
    mobileSavePinControllerPosition,
    mobileControllerUserIsHolding,
    mobileSavePinControllerIsActive,
    closeMobilePinController,
  } = useAppsStore();
  const { isHovered, setIsHovered } = useMobileHover(
    'mobile-controller-article'
  );

  useLockScroll();
  useGetButtonsTranslateAxis({
    rotation: mobilePinControllerRotation,
    setToStore: setPinControllerButtonsTranslate,
  });

  useEffect(() => {
    if (isHovered && !mobileControllerUserIsHolding) closeMobilePinController();
  }, [mobileControllerUserIsHolding]);

  return (
    <>
      {mobileSavePinControllerIsActive && <MobileControllerFilter />}

      <div
        className='absolute z-[90]'
        style={{
          transform: 'translate(-65px,-130px)',
        }}
      >
        <article
          id='mobile-controller-article'
          className='p-2 w-[130px] h-[130px] rounded-full flex justify-center items-center relative'
          style={{
            rotate: `${mobilePinControllerRotation}deg`,
            top: `${mobileSavePinControllerPosition.y}px`,
            left: `${mobileSavePinControllerPosition.x}px`,
          }}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={closeMobilePinController}
        >
          <MobileControllerCenterCircle />
          <article>
            <MobileControllerLikeBtn />
            <MobileControllerSaveBtn />
            <MobileControllerShareBtn />
            <MobileControllerShareWhatsappBtn />
          </article>
        </article>
      </div>
    </>
  );
};
