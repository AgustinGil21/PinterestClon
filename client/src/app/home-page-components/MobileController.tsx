import { FaShare } from 'react-icons/fa';
import { MobileControllerBtn } from './MobileControllerBtn';
import { useEffect, useState } from 'react';
import { MobileControllerShareBtn } from './mobile-controller-btns/MobileControllerShareBtn';
import { MobileControllerShareWhatsappBtn } from './mobile-controller-btns/MobileControllerShareWhatsappBtn';
import { MobileControllerLikeBtn } from './mobile-controller-btns/MobileControllerLikeBtn';
import { MobileControllerSaveBtn } from './mobile-controller-btns/MobileControllerSaveBtn';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetButtonsTranslateAxis } from '../hooks/useGetButtonsTranslateAxis';

export const MobileController = () => {
  const {
    mobilePinControllerRotation,
    setMobilePinControllerRotation,
    setPinControllerButtonsTranslate,
  } = useAppsStore();

  useGetButtonsTranslateAxis({
    rotation: mobilePinControllerRotation,
    setToStore: setPinControllerButtonsTranslate,
  });

  useEffect(() => {
    setMobilePinControllerRotation(0);
  }, []);

  return (
    <div
      className='p-2 w-[130px] h-[130px] rounded-full mr-10 flex justify-center items-center z-0 relative mt-16 ml-10'
      style={{
        rotate: `${mobilePinControllerRotation}deg`,
      }}
    >
      <div className=' outline-3 outline outline-slate-400 min-w-[35px] min-h-[35px] w-[35px] h-[35px] rounded-full opacity-40'></div>
      <MobileControllerLikeBtn />
      <MobileControllerSaveBtn />
      <MobileControllerShareBtn />
      <MobileControllerShareWhatsappBtn />
    </div>
  );
};
