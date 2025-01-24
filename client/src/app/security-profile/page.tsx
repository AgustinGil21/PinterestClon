'use client';
import React, { useState, useEffect } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import Loader from '../interfaces/components/Basic/Loader';
import AuthTwoFactors from './components/AuthTwoFactors';

const SecurityProfile = () => {
  const { userPublicData, t } = useAppsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(false);
    };

    loadUserData();
  }, []);

  if (!userPublicData?.username) return null;

  if (loading) {
    return (
      <section className='w-full flex justify-center '>
        <Loader />
      </section>
    );
  }

  return (
    <>
      <section className='p-5 py-8 flex flex-col'>
        <div className='max-w-[420px] w-full lg:ml-[140px] flex flex-col gap-5 dark:text-white'>
          <div>
            <h2 className='text-[23px] font-semibold'>
              {t?.security.title || 'Seguridad'}
            </h2>
            <p className='text-[13px] max-w-[440px]'>
              {t?.security.description ||
                'Activa la autenticación de dos factores y controla la lista de dispositivos conectados como medidas de seguridad adicionales para mantener seguros tus Pines, tus tableros y tu cuenta.'}
            </p>
          </div>
          <AuthTwoFactors />
        </div>
      </section>
    </>
  );
};

export default SecurityProfile;
