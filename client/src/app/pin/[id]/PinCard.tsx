import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ImagePin from './ImagePin';
import ActionsPin from './ActionsPin';
import DataUserPinCard from './DataUserPinCard';
import InputComment from './InputComment';
import { ArrowDownIcon } from '@/app/icons/ArrowDown';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import AvatarUser from '@/app/interfaces/layout/Header/Avatar/AvatarUser';
import RelativeTime from '@/app/components/Basic/RelativeTime';
import SingularOrPlural from '@/app/components/Basic/SingularOrPlural';
import Counter from '@/app/components/Basic/Counter';
import { useGetElementSize } from '@/app/hooks/useGetElementSize';

const PinCard = () => {
  const { pinData, getPinComments, commentsState, resetComments } =
    useAppsStore();
  const [openComments, setOpenComments] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);
  const { height: cardHeight } = useGetElementSize(cardRef);

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
    <div
      className='max-w-[930px] bg-white shadow-pinShadow rounded-[30px] w-full p-5 flex flex-row gap-4 max-h-[800px] min-h-[466px]'
      ref={cardRef}
    >
      <ImagePin />
      <div
        className='w-[50%] flex flex-col gap-2 min-h-[449px] max-h-[750px] justify-between '
        style={{ height: `${cardHeight - 32}px` }}
      >
        <div>
          <ActionsPin />

          <DataUserPinCard />

          <div className='flex flex-col justify-between py-2 h-fit max-h-[510px] min-h-[180px]'>
            <div>
              <div
                className={`flex flex-row justify-between px-1 cursor-pointer h-full ${
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
                  className='mt-3 overflow-y-auto h-full max-h-[470px] min-h-[145px]'
                  onScroll={handleScroll}
                >
                  {commentsState.comments.map((elem, index) => (
                    <div
                      key={index}
                      className='flex flex-row gap-2 mt-1 h-full'
                    >
                      <AvatarUser
                        textSize='text-xs'
                        data={elem}
                        classProps='max-w-[25px] max-h-[25px] min-w-[25px] min-h-[25px] w-full h-full object-cover rounded-full'
                      />
                      <div className='flex flex-col'>
                        <div className='flex flex-col'>
                          <h5 className='text-nowrap font-semibold text-[13px] flex flex-row items-center gap-1.5'>
                            {elem.username}
                            <RelativeTime
                              props={{
                                date: elem.created_at,
                                lang: 'es',
                                className: 'text-[#b3b3b3] text-[11px]',
                              }}
                            />
                          </h5>
                          <p className='text-sm'>{elem.content}</p>
                        </div>
                        <div className='flex flex-row gap-2  items-center'>
                          <span className='text-[#b3b3b3] text-[11px] font-semibold cursor-pointer'>
                            Responder
                          </span>
                          <div className='flex flex-row-reverse gap-1 items-center'>
                            {elem.likes_count !== '0' && (
                              <Counter
                                value={elem.likes_count}
                                className='text-black text-[12px]'
                              />
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
          </div>
        </div>
        <footer className='w-full relative h-14 flex items-end bg-white'>
          {!commentsState.comments.length && (
            <span className='absolute -top-7 font-semibold'>
              ¿Qué te parece?
            </span>
          )}
          <InputComment />
        </footer>
      </div>
    </div>
  );
};

export default PinCard;
