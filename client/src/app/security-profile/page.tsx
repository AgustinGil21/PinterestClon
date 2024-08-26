'use client';
import React, { useState, useEffect } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import Loader from '../interfaces/components/Basic/Loader';

const SecurityProfile = () => {
  const { userPublicData } = useAppsStore();
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
      <div>Security profile</div>
    </>
  );
};

export default SecurityProfile;
