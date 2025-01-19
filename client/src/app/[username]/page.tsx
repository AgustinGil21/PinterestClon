'use client';
import { useEffect, useState, useCallback } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import Loader from '../interfaces/components/Basic/Loader';
import AvatarUser from '../interfaces/layout/Header/Avatar/AvatarUser';
import DataUser from '../user-profile/DataUser';
import DownloadShare from '../account-search/DownloadShare';
import ThreePointsBlok from '../account-search/ThreePointsBlok';
import Message from '../account-search/Message';
import Follow from '../account-search/Follow';
import ButtonsGroup from '../user-profile/ButtonsGroup';
import CreatesOrSavesLink from '../user-profile/CreatesOrSavesLink';
import Masonry from '../interfaces/components/Basic/Masonry';
import { Pin } from '../home-page-components/Pin';

interface Props {
  params: { username?: string };
}

export default function UserProfile({ params }: Props) {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [savesOrCreates, setSavesOrCreates] = useState<boolean | null>(null);
  const {
    dataSearchUserProfile,
    getSearchUserProfile,
    isFollowing,
    getCreatedPins,
    createdPins,
    savedPins,
    getSavePins,
  } = useAppsStore();
  const { username }: any = params;

  useEffect(() => {
    getSavePins(username, page, 10);
  }, []);

  useEffect(() => {
    const updateFollowingStatus = async () => {
      if (!dataSearchUserProfile?.id) return;

      await getSearchUserProfile(username);
    };

    updateFollowingStatus();
  }, [isFollowing]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (!dataSearchUserProfile.id) {
        if (username) {
          await getSearchUserProfile(username);
        }
      }

      await getCreatedPins(username, 1, 10, true);

      setLoading(false);
    };

    fetchData();
  }, [username]);

  const handleScroll = useCallback(async () => {
    const isBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;

    if (isBottom && !loadingMore) {
      setLoadingMore(true);
      try {
        const nextPage = page + 1;
        setPage(nextPage);
        if (username) {
          await getCreatedPins(username, nextPage, 10, false);
        }
      } finally {
        setLoadingMore(false);
      }
    }
  }, [loadingMore, page, username, getCreatedPins]);

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
    <section className='p-5 min-h-screen flex w-full flex-col relative'>
      <div className='flex items-center w-full flex-col'>
        <AvatarUser
          data={dataSearchUserProfile}
          classProps='w-[110px] h-[110px]'
          textSize='text-[40px]'
        />
        <DataUser data={dataSearchUserProfile} />
        {dataSearchUserProfile.its_you ? (
          <ButtonsGroup username={dataSearchUserProfile.username} />
        ) : (
          <div className='flex flex-row justify-between items-center gap-3.5 mt-4'>
            <DownloadShare
              classProps='p-3'
              dataShare={dataSearchUserProfile.username}
            />
            <div className='flex flex-row gap-2'>
              <Message />
              <Follow
                classPropsFalseIsFollowing='bg-redPinterestBg rounded-full hover:bg-red-800 text-white'
                classPropsTrueIsFollowing='bg-black rounded-full text-white'
                following={dataSearchUserProfile.following}
                id={dataSearchUserProfile.id}
              />
            </div>
            <ThreePointsBlok />
          </div>
        )}

        <CreatesOrSavesLink
          savesOrCreates={savesOrCreates}
          setSavesOrCreates={setSavesOrCreates}
        />
      </div>

      {savesOrCreates ? (
        <Masonry className='w-full'>
          {createdPins.map((elem) => (
            <Pin elem={elem} key={elem.pin_id} className='mb-4 z-10' />
          ))}
        </Masonry>
      ) : (
        <Masonry className='w-full'>
          {savedPins.map((elem) => (
            <Pin elem={elem} key={elem.pin_id} className='mb-4 z-10' />
          ))}
        </Masonry>
      )}
    </section>
  );
}
