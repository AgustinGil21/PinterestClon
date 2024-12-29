'use client';
import ImagePin from './ImagePin';
import ActionsPin from './ActionsPin';
import DataUserPinCard from './DataUserPinCard';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { ArrowDownIcon } from '@/app/icons/ArrowDown';
import { useState } from 'react';
import InputComment from './InputComment';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';

const PinCard = () => {
  const { pinData, isAuth, openRegisterModal } = useAppsStore();
  const [openComments, setOpenComments] = useState(true);

  const handleClick = () => {
    setOpenComments(!openComments);
  };

  return (
    <div className='max-w-[930px] bg-white shadow-pinShadow rounded-[30px] w-full p-5 flex flex-row gap-4 h-full  '>
      <ImagePin />
      <div className='w-[50%] flex flex-col'>
        <ActionsPin />

        <DataUserPinCard />

        <div className='flex flex-col justify-between p-2 h-full'>
          <div>
            <div
              className='flex flex-row justify-between px-1 cursor-pointer'
              onClick={handleClick}
            >
              <span className='font-semibold '>
                {pinData.comments} comentarios
              </span>

              <ArrowDownIcon
                classProps={`w-[24px] h-[24px] cursor-pointer arrow-icon arrow-icon-rotate ${
                  openComments && `transform rotate-180`
                }`}
              />
            </div>
            {openComments && (
              <div className='mt-3 overflow-y-auto max-h-[410px]'>
                <div className='flex flex-row gap-2'>
                  <div className='w-[25px] h-[25px] bg-gray-500 font-semibold flex justify-center items-center rounded-full p-2 text-sm'>
                    h
                  </div>
                  {/* <AvatarUser data={''} /> */}
                  <div className='flex flex-col'>
                    <div className='flex flex-col'>
                      <h5 className='text-nowrap font-semibold text-[13px] flex flex-row items-center gap-1'>
                        Leo messi
                        <span className='text-gray-400 text-[11px]'>2 a</span>
                      </h5>
                      <p className='text-sm'>
                        Increible publciacion leo messi es increible a marcado
                        miles de goles en el barcelona y la seleccion argentina
                      </p>
                    </div>
                    <div className='flex flex-row gap-2 mt-1 items-center'>
                      <span className='text-gray-500 text-[11px] font-semibold cursor-pointer'>
                        Responder
                      </span>
                      <div className='flex flex-row-reverse gap-1 items-center'>
                        <span className='text-gray-400 text-[12px]'>4</span>{' '}
                        <LikeIcon classProps='w-[12px] h-[12px] cursor-pointer' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <InputComment />
        </div>
      </div>
    </div>
  );
};

export default PinCard;
