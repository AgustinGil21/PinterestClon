import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ImagePin from './ImagePin';
import ActionsPin from './ActionsPin';
import DataUserPinCard from './DataUserPinCard';
import InputComment from './InputComment';
import { ArrowDownIcon } from '@/app/icons/ArrowDown';
import Comment from './Comment';
import { useGetElementSize } from '@/app/hooks/useGetElementSize';
import { useGetElementDistance } from '@/app/hooks/useGetElementsDistance';

const PinCard = () => {
  const {
    pinData,
    getPinComments,
    commentsState,
    resetComments,
    getLastBoard,
  } = useAppsStore();

  const [openComments, setOpenComments] = useState(true);
  const [commentsCount, setCommentsCount] = useState(Number(pinData.comments));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);
  const openCommentsRef = useRef(null);
  const footerRef = useRef(null);

  const { height: cardHeight } = useGetElementSize(cardRef);

  const commentsMaxHeight = useGetElementDistance({
    ref1: footerRef,
    ref2: openCommentsRef,
    axis: 'y',
    dependencies: [commentsCount],
  });

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

  const handlePrueba = () => {
    getLastBoard();
  };

  const handleCommentsCount = () => {
    setCommentsCount((prev) => prev + 1);
  };

  const handleDeleteComment = () => {
    setCommentsCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    resetComments();
    setPage(1);
    getPinComments(pinData.id, 1, 10);
  }, [pinData.id, getPinComments]);

  return (
    <div
      className='bg-white shadow-pinShadow rounded-[30px] w-full p-4 flex flex-col lg:flex-row gap-4  min-h-[466px] max-w-[930px] lg:p-5 lg:gap-6 lg:rounded-[30px]'
      onMouseOver={handlePrueba}
      ref={cardRef}
    >
      <ImagePin />

      <div className='w-full lg:w-[50%] grid grid-rows-[1fr_auto] h-full'>
        <div>
          <ActionsPin />
          <DataUserPinCard />
          <div className='flex flex-col justify-between py-2 h-fit max-h-[510px] min-h-[180px]'>
            <div>
              <div
                className={`flex flex-row justify-between px-1 cursor-pointer h-full max-h-full ${
                  !commentsCount && 'hidden'
                }`}
                onClick={handleClick}
                ref={openCommentsRef}
              >
                <span className='font-semibold'>
                  {commentsCount === 1
                    ? `${commentsCount} Comentario `
                    : `${commentsCount} comentarios`}
                </span>

                <ArrowDownIcon
                  classProps={`w-[24px] h-[24px] cursor-pointer arrow-icon arrow-icon-rotate ${
                    openComments && `transform rotate-180`
                  }`}
                />
              </div>

              {openComments && (
                <div
                  className='mt-3 overflow-y-auto h-full max-h-[350px] lg:min-h-[350px]'
                  onScroll={handleScroll}
                >
                  {commentsState.comments.map((elem, index) => (
                    <Comment
                      elem={elem}
                      key={index}
                      handleCommentsCount={handleDeleteComment}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <footer
          className='w-full relative h-14 flex self-end bg-white items-end'
          ref={footerRef}
        >
          {!commentsState.comments.length && (
            <span className='absolute -top-7 font-semibold'>
              ¿Qué te parece?
            </span>
          )}
          <InputComment handleCommentsCount={handleCommentsCount} />
        </footer>
      </div>
    </div>
  );
};

export default PinCard;
