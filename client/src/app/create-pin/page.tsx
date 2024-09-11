'use client';
import Loader from '../interfaces/components/Basic/Loader';
import { useState, useEffect } from 'react';
import AsideCreateClose from './components/AsideCreateOpen';
import AsideCreateOpen from './components/AsideCreateClose';
import FormCreatePin from './components/FormCreatePin';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import { serviceGetCategoriesPin } from '../infrastructure/services/service-pins';

const CreatePin = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const { isAuth, getDataUserLogged } = useAppsStore();
  const router = useRouter();

  serviceGetCategoriesPin();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await getDataUserLogged();
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [getDataUserLogged]);

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        router.push('/');
      }
    }
  }, [isAuth, loading, router]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return (
      <section className='w-full flex justify-center'>
        <Loader />
      </section>
    );
  }

  return (
    <section className='w-full border-t-gray-300 border-t-[1px] flex flex-row min-h-screen'>
      {isOpen ? (
        <AsideCreateClose handleClick={handleClick} />
      ) : (
        <AsideCreateOpen handleClick={handleClick} />
      )}

      <div className='w-full'>
        <FormCreatePin />
      </div>
    </section>
  );
};

export default CreatePin;
