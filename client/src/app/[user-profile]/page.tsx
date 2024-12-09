'use client';
import Loader from '../interfaces/components/Basic/Loader';
import { useEffect, useState } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { Pin } from '../home-page-components/Pin';
import DataUser from './DataUser';
import AvatarUser from '../interfaces/layout/Header/Avatar/AvatarUser';
import ButtonsGroup from './ButtonsGroup';
import CreatesOrSavesLink from './CreatesOrSavesLink';
import { useRouter } from 'next/router';

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [savesOrCreates, setSavesOrCreates] = useState<boolean | null>(null);

  const {
    getPreviousPins,
    previousPin,

    getUserOwnerProfile,

    dataSearchUserProfile,
    isShareAccountOpen,
    openShareAccountModal,
    getSearchUserProfile,
  } = useAppsStore();

  const username: string | null = sessionStorage.getItem('username');
  useEffect(() => {
    const fetchData = async () => {
      await getPreviousPins();
      if (username) {
        await getSearchUserProfile(username);
      }

      console.log(dataSearchUserProfile);
      setLoading(false);
    };

    fetchData();
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
          classProps='h-[110px] w-[110px] '
          textSize='text-[40px]'
          isClickable={false}
        />

        <DataUser data={dataSearchUserProfile} />

        <ButtonsGroup
          isShareAccountOpen={isShareAccountOpen}
          openShareAccountModal={openShareAccountModal}
          username={dataSearchUserProfile.username}
        />

        <CreatesOrSavesLink
          savesOrCreates={savesOrCreates}
          setSavesOrCreates={setSavesOrCreates}
        />
      </div>
      {savesOrCreates ? (
        <div className='masonry mt-5'>
          {previousPin.map((elem) => (
            <Pin pin_id={elem.id} key={elem.id} body={elem.body} />
          ))}
        </div>
      ) : (
        <p>Guardados</p>
      )}
    </section>
  );
}
