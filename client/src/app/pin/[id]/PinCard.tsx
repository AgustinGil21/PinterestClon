import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ImagePin from './ImagePin';
import ActionsPin from './ActionsPin';
import DataUserPinCard from './DataUserPinCard';
import InputComment from './InputComment';
import { ArrowDownIcon } from '@/app/icons/ArrowDown';
import Comment from './Comment';

const PinCard = () => {
  const {
    pinData,
    getPinComments,
    commentsState,
    resetComments,
    getLastBoard,
  } = useAppsStore();

  const [imgHeight, setImgHeight] = useState(0);
  const [openComments, setOpenComments] = useState(true);
  const [commentsCount, setCommentsCount] = useState(Number(pinData.comments));
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
    const img = new Image();
    img.src = pinData.body;
    img.onload = () => {
      setImgHeight(img.height);
    };
  }, [pinData.body]);

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

  const sizeCategory = (() => {
    if (imgHeight < 700) return 'small';
    if (imgHeight >= 700 && imgHeight < 1200) return 'medium';
    return 'large';
  })();

  // console.log(sizeCategory, imgHeight);

  return (
    <div className='bg-white shadow-pinShadow rounded-[30px] w-full p-4 flex flex-col lg:flex-row gap-4  min-h-[466px] sm:max-w-[530px] lg:max-w-[930px] lg:p-5 lg:gap-6 lg:rounded-[30px] '>
      <ImagePin size={sizeCategory} />

      <div className='w-full lg:w-[50%] grid grid-rows-[1fr_auto]'>
        <div className='max-h-[100%] overflow-hidden'>
          <ActionsPin />
          <DataUserPinCard />
          <div className='flex flex-col justify-between py-2 h-fit max-h-[510px] min-h-[180px]'>
            <div className='sm:max-h-[330px]'>
              <div
                className={`flex flex-row justify-between px-1 cursor-pointer h-full max-h-full ${
                  !commentsCount && 'hidden'
                }`}
                onClick={handleClick}
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
                  className='mt-3 overflow-y-auto h-full '
                  onScroll={handleScroll}
                  style={{
                    maxHeight:
                      sizeCategory === 'small'
                        ? '183px'
                        : sizeCategory === 'medium'
                        ? '295px'
                        : '460px',
                    minHeight:
                      sizeCategory === 'small'
                        ? '183px'
                        : sizeCategory === 'medium'
                        ? '295px'
                        : '460px',
                    height:
                      sizeCategory === 'small'
                        ? '183px'
                        : sizeCategory === 'medium'
                        ? '295px'
                        : '460px',
                  }}
                >
                  {commentsState.comments.map((elem, index) => (
                    <Comment
                      elem={elem}
                      key={elem.id}
                      commentIndex={index}
                      commentsLength={commentsState.comments.length}
                      handleCommentsCount={handleDeleteComment}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className='w-full relative h-14 flex self-end bg-white items-end'>
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
