import { useState } from 'react';
import { DynamicModal } from '../components/Basic/DynamicModal';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { ShareComponent } from '../components/Basic/ShareComponent';

export const SharePinModal = () => {
  const {
    dynamicSharePinModalIsOpen,
    closeDynamicSharePinModal,
    sharePinBtnRef,
    sharePinData,
  } = useAppsStore();

  return (
    <DynamicModal
      closeDynamicModal={closeDynamicSharePinModal}
      dynamicModalIsOpen={dynamicSharePinModalIsOpen}
      btnRef={sharePinBtnRef}
      width={325}
      height={230}
      className='z-50 bg-white py-5 px-4 rounded-xl shadow-uniform'
    >
      <ShareComponent endpoint='pins' data={sharePinData} />
    </DynamicModal>
  );
};
