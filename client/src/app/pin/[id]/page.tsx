'use client';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect, useState, useCallback } from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import PinCard from './PinCard';
import Loader from '@/app/interfaces/components/Basic/Loader';
import { useRouter } from 'next/navigation';
import ArrowTwoLeftIcon from '@/app/interfaces/components/icons/ArrowTwoLeftIcon';
import { Pin } from '@/app/home-page-components/Pin';
import Masonry from '@/app/interfaces/components/Basic/Masonry';
import { changeDocTitle } from '@/app/libs/changeDocTitle';

interface PinPreviewPageInterface {
  params: { id?: string };
}

const PinPreviewPage = ({ params }: PinPreviewPageInterface) => {
  const {
    pinData,
    getPinView,
    getCategoriesPin,
    getLastBoard,
    getSimilarPins,
    similarPins,
    getBoardsList,
    t,
  } = useAppsStore();

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    getLastBoard();
    getBoardsList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          await getPinView(id);
        }
        await getCategoriesPin();
        if (id) {
          await getSimilarPins(id, 1, 10);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    changeDocTitle(pinData?.title || 'Pin page');
  }, [pinData]);

  const handleGoBack = () => {
    router.back();
  };

  const handleScroll = useCallback(async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loadingMore) {
        setLoadingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);
        if (id) {
          await getSimilarPins(id, nextPage, 10);
        }
        setLoadingMore(false);
      }
    }
  }, [loadingMore, page, id]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (loading) {
    return (
      <section className='w-full flex justify-center'>
        <Loader />
      </section>
    );
  }

  return (
    <section className='flex justify-center items-center w-full md:p-2 relative min-h-[90vh] flex-col gap-4'>
      <div className='absolute top-0 left-0 m-4  md:inline-block hidden'>
        <ButtonStyled
          className='font-semibold text-sm lg:flex items-center flex-row gap-2 hover:bg-gray-200 '
          handleClick={handleGoBack}
        >
          <ArrowTwoLeftIcon />

          <span className='hidden xl:inline '>
            {t?.pin['for-you'] || 'Para ti'}
          </span>
        </ButtonStyled>
      </div>

      <PinCard />

      <Masonry className='w-full'>
        {similarPins.map((elem) => (
          <Pin elem={elem} className='' key={elem.pin_id} />
        ))}
      </Masonry>
    </section>
  );
};

export default PinPreviewPage;
