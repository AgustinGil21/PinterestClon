import React, { useState, useEffect } from 'react';
import PinterestLogo from '../../components/icons/PinterestLogo';
import SearchInput from './Search/SearchInput';
import NavUser from './Nav/NavUser';
import HeaderAuth from './SignOut/HeaderAuth';
import { UserLoggedIn } from './LogIn/UserLoggedIn';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const Header = () => {
  const { isAuth, getDataUserLogged, userPublicData } = useAppsStore();
  const [loading, setLoading] = useState(true);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getDataUserLogged();

      setLoading(false);
    };

    fetchData();
  }, [getDataUserLogged]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setShadow(window.scrollY > 0);
  };

  if (loading) {
    return (
      <header className='w-full text-white py-3 flex gap-3 px-4 items-center bg-white dark:bg-gray-900 fixed'>
        <div className='flex items-center gap-2.5'>
          <div className='hover:bg-slate-200 p-2 rounded-full cursor-pointer mr-1.5'>
            <PinterestLogo classProps='w-[21px] h-[21px]' />
          </div>
          <NavUser loginAuth={isAuth} />
        </div>
        <SearchInput />
        <UserLoggedIn />
      </header>
    );
  }

  return (
    <header
      className={`w-full h-16 text-white py-3 flex gap-3 px-4 items-center bg-white dark:bg-gray-900 fixed top-0 z-50 ${
        shadow ? 'shadow-md' : ''
      }`}
    >
      <div className='flex items-center gap-2.5'>
        <div className='hover:bg-slate-200 p-2 rounded-full cursor-pointer mr-1.5'>
          <PinterestLogo classProps='w-[21px] h-[21px]' />
        </div>
        <NavUser loginAuth={isAuth} />
      </div>
      <SearchInput />
      {loading ? <UserLoggedIn /> : isAuth ? <UserLoggedIn /> : <HeaderAuth />}
    </header>
  );
};
