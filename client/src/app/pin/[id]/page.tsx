'use client';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import PinCard from './PinCard';
import Loader from '@/app/interfaces/components/Basic/Loader';
import { useRouter } from 'next/navigation';
import ArrowTwoLeftIcon from '@/app/interfaces/components/icons/ArrowTwoLeftIcon';

interface PinPreviewPageInterface {
  params: { id?: string };
}

const PinPreviewPage = ({ params }: PinPreviewPageInterface) => {
  const { pinData, getPinView, getCategoriesPin, isFollowing } = useAppsStore();

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          await getPinView(id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isFollowing]);

  useEffect(() => {
    getCategoriesPin();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <section className='w-full flex justify-center'>
        <Loader />
      </section>
    );
  }

  return (
    <section className='flex justify-center items-center  w-full p-2 relative min-h-[90vh] '>
      <div className='absolute top-0 left-0 m-4'>
        <ButtonStyled
          className='font-semibold text-sm flex items-center flex-row gap-4 hover:bg-gray-200 '
          handleClick={handleGoBack}
        >
          <ArrowTwoLeftIcon />
          Para ti
        </ButtonStyled>
      </div>
      <PinCard />
    </section>
  );
};

export default PinPreviewPage;
