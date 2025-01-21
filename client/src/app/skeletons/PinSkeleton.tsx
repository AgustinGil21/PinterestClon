import { useEffect, useState } from 'react';
import { Skeleton } from '../components/Basic/Skeleton';
import getDarkColor from '../interfaces/helpers/getColorDark';
import { useGetDarkColor } from '../hooks/useGetDarkColor';

export const PinSkeleton = () => {
  const color = useGetDarkColor();

  const angle = 'vertical';
  const direction = 'left';

  return (
    <div className='flex flex-col gap-2 w-full mt-4 mb-4'>
      <Skeleton
        height={400}
        angle={angle}
        direction={direction}
        color={color}
        className='w-full'
        speed='slow'
        borderRadius='16px'
      />
      <div className='px-1 flex flex-col gap-2'>
        <Skeleton
          presets='text'
          fontSize='base'
          angle={angle}
          direction={direction}
          color={color}
          className='w-full'
          speed='slow'
        />
        <div className='flex gap-2 items-center'>
          <Skeleton
            presets='circle'
            width={30}
            height={30}
            angle={angle}
            direction={direction}
            color={color}
            borderRadius='100%'
            speed='slow'
          />

          <Skeleton
            presets='text'
            fontSize='base'
            angle={angle}
            direction={direction}
            color={color}
            className='w-[50%]'
            speed='slow'
          />
        </div>
      </div>
    </div>
  );
};
