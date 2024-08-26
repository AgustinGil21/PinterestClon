'use client';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import PrivacyOrPublicSwitch from './Components/PrivacyOrPublicSwitch';
import Loader from '../interfaces/components/Basic/Loader';
import { useState, useEffect } from 'react';

const PrivacyInfo = () => {
  const { userPublicData } = useAppsStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(false);
    };

    loadUserData();
  }, []);

  if (!userPublicData?.email_address) {
    return null;
  }

  if (loading) {
    return (
      <section className='w-full flex justify-center '>
        <Loader />
      </section>
    );
  }

  return (
    <section className='p-5 py-8 flex flex-col'>
      <div className='max-w-[420px] w-full lg:ml-[240px] flex flex-col gap-5 dark:text-white'>
        <div>
          <h2 className='text-[23px] font-semibold'>Visibilidad del perfil</h2>
          <p className='text-sm max-w-[440px]'>
            Administra cómo se puede ver tu perfil dentro y fuera de Pinterest.
          </p>
        </div>
        <PrivacyOrPublicSwitch />
      </div>
    </section>
  );
};

export default PrivacyInfo;
