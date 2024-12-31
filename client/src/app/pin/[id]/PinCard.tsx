import { useEffect, useState, useCallback } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ImagePin from './ImagePin';
import ActionsPin from './ActionsPin';
import DataUserPinCard from './DataUserPinCard';
import InputComment from './InputComment';
import { ArrowDownIcon } from '@/app/icons/ArrowDown';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import AvatarUser from '@/app/interfaces/layout/Header/Avatar/AvatarUser';

const PinCard = () => {
  const { pinData, getPinComments, commentsState, resetComments } =
    useAppsStore();
  const [openComments, setOpenComments] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setOpenComments(!openComments);
  };

  const loadMoreComments = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      setPage((prevPage) => prevPage + 1);
      await getPinComments(pinData.id, page, 10);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, pinData.id, getPinComments]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
        loadMoreComments();
      }
    },
    [loadMoreComments, isLoading]
  );

  useEffect(() => {
    resetComments();
    setPage(1);
    getPinComments(pinData.id, 1, 10);
  }, [pinData.id, getPinComments]);

  return (
    <div className='max-w-[930px] bg-white shadow-pinShadow rounded-[30px] w-full p-5 flex flex-row gap-4 h-full'>
      <ImagePin />
      <div className='w-[50%] flex flex-col gap-2'>
        <ActionsPin />

        <DataUserPinCard />

        <div className='flex flex-col justify-between p-2 h-full'>
          <div>
            <div
              className={`flex flex-row justify-between px-1 cursor-pointer ${
                pinData.comments === '0' && 'hidden'
              }`}
              onClick={handleClick}
            >
              <span className='font-semibold'>
                {pinData.comments === '1'
                  ? `${pinData.comments} Comentario `
                  : `${pinData.comments} comentarios`}
              </span>

              <ArrowDownIcon
                classProps={`w-[24px] h-[24px] cursor-pointer arrow-icon arrow-icon-rotate ${
                  openComments && `transform rotate-180`
                }`}
              />
            </div>
            {openComments && (
              <div
                className='mt-3 overflow-y-auto max-h-[429px]'
                onScroll={handleScroll}
              >
                {commentsState.comments.map((elem, index) => (
                  <div key={index} className='flex flex-row gap-2 mt-1'>
                    <AvatarUser
                      textSize='text-sm'
                      data={elem}
                      classProps='max-w-[25px] max-h-[25px] w-full h-full object-cover rounded-full'
                    />
                    <div className='flex flex-col'>
                      <div className='flex flex-col'>
                        <h5 className='text-nowrap font-semibold text-[13px] flex flex-row items-center gap-1.5'>
                          {elem.username}
                          <span className='text-[#b3b3b3] text-[11px]'>
                            2 a
                          </span>
                        </h5>
                        <p className='text-sm'>{elem.content}</p>
                      </div>
                      <div className='flex flex-row gap-2  items-center'>
                        <span className='text-[#b3b3b3] text-[11px] font-semibold cursor-pointer'>
                          Responder
                        </span>
                        <div className='flex flex-row-reverse gap-1 items-center'>
                          {elem.likes_count !== '0' && (
                            <span className='text-black text-[12px]'>
                              {' '}
                              {elem.likes_count}
                            </span>
                          )}
                          <LikeIcon classProps='w-[12px] h-[12px] cursor-pointer' />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
