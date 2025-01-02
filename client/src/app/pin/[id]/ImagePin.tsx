import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import React from 'react';

const ImagePin = () => {
  const { pinData } = useAppsStore();

  return (
    <div className='w-[50%] bg-slate-200 h-full rounded-xl min-h-[449px] max-h-[750px] overflow-hidden'>
      <img
        src={pinData.body}
        alt={pinData.alt_text}
        className='w-full rounded-xl h-full object-cover min-h-[449px] max-h-[750px] hover:scale-110 transition-transform duration-300'
      />
    </div>
  );
};

export default ImagePin;
