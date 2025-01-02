import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ImagePin from './ImagePin';
import ActionsPin from './ActionsPin';
import DataUserPinCard from './DataUserPinCard';
import InputComment from './InputComment';
import { ArrowDownIcon } from '@/app/icons/ArrowDown';
import Comment from './Comment';
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
                    <Comment elem={elem} key={index} />
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
