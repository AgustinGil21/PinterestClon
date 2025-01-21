import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import React from 'react';

const ImagePin = ({ size }: { size: 'small' | 'medium' | 'large' }) => {
  const { pinData } = useAppsStore();

  return (
    <div
      className='w-full lg:w-[50%] bg-slate-200 h-auto lg:h-full rounded-xl overflow-hidden'
      style={{
        maxHeight:
          size === 'small' ? '500px' : size === 'medium' ? '611px' : '960px',
        minHeight:
          size === 'small' ? '500px' : size === 'medium' ? '611px' : '960px',
        height:
          size === 'small' ? '500px' : size === 'medium' ? '611px' : '960px',
      }}
    >
      <img
        src={pinData.body}
        alt={pinData.alt_text}
        className='w-full h-auto lg:h-full object-cover rounded-xl hover:scale-110 transition-transform duration-300'
      />
    </div>
  );
};

export default ImagePin;
