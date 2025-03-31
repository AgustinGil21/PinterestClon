import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import React from 'react';

const ImagePin = ({ size }: { size: 'small' | 'medium' | 'large' }) => {
  const { pinData } = useAppsStore();

  return (
    <div
      className='w-full lg:w-[50%] bg-slate-200 h-auto lg:h-full rounded-t-md rounded-b-xl md:rounded-2xl overflow-hidden'
      style={{
        maxHeight:
          size === 'small' ? '500px' : size === 'medium' ? '611px' : '760px',
        minHeight:
          size === 'small' ? '500px' : size === 'medium' ? '611px' : '760px',
        height:
          size === 'small' ? '500px' : size === 'medium' ? '611px' : '760px',
      }}
    >
      <img
        src={pinData.body}
        alt={pinData.alt_text}
        className='w-full h-full rounded-t-md lg:h-full object-cover rounded-b-2xl md:rounded-xl hover:scale-110 transition-transform duration-300'
      />
    </div>
  );
};

export default ImagePin;
