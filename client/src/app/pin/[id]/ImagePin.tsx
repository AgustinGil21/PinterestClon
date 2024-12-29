import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import React from 'react';

const ImagePin = () => {
  const { pinData } = useAppsStore();

  return (
    <div className='w-[50%] bg-slate-200  h-full rounded-xl '>
      <img
        src={pinData.body}
        alt={pinData.alt_text}
        className='w-full rounded-xl h-full object-cover'
      />
    </div>
  );
};

export default ImagePin;
