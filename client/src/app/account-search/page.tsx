'use client';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import Loader from '../interfaces/components/Basic/Loader';
import { useEffect, useState } from 'react';
import AvatarUser from '../interfaces/layout/Header/Avatar/AvatarUser';
import { usePathname, useSearchParams } from 'next/navigation';
import DataUser from '../user-profile/DataUser';
import DownloadShare from './DownloadShare';
import ThreePointsBlok from './ThreePointsBlok';
import Message from './Message';
import Follow from './Follow';

export default function SearchProfile() {
  const [loading, setLoading] = useState(true);
  const { dataSearchUserProfile, getSearchUserProfile, isFollowing } =
    useAppsStore();
  const searchParams = useSearchParams();
  const username = searchParams.get('query');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (username) {
      getSearchUserProfile(username);
    }
  }, [username, isFollowing]);

  useEffect(() => {
    if (dataSearchUserProfile.id === '') {
      if (username) {
        getSearchUserProfile(username);
      }
    }
  }, []);

  if (!dataSearchUserProfile.username) {
    return null;
  }

  if (loading) {
    return (
      <section className='w-full flex justify-center'>
        <Loader />
      </section>
    );
  }
  return (
    <section className='p-5 min-h-screen flex w-full flex-col'>
      <div className='flex items-center w-full flex-col '>
        <AvatarUser
          data={dataSearchUserProfile}
          classProps='w-[110px] h-[110px]'
          textSize='text-[40px]'
        />

        <DataUser data={dataSearchUserProfile} />

        <div className='flex flex-row justify-between items-center gap-3.5 mt-4'>
          <DownloadShare />

          <div className=' flex flex-row gap-2'>
            <Message />
            <Follow />
          </div>
          <ThreePointsBlok />
        </div>
      </div>
    </section>
  );
}
