'use client';
import { useState } from 'react';
import PinterestLogo from '../icons/PinterestLogo';
import SearchInput from './Search/SearchInput';
import NavUser from './Nav/NavUser';
import HeaderAuth from './SignOut/HeaderAuth';
import { UserLoggedIn } from './LogIn/UserLoggedIn';

export const Header = () => {
  const [loginAuth, setLoginAuth] = useState(false);

  return (
    <header className='w-full  text-white py-3 flex gap-3 px-5 items-center bg-white dark:bg-gray-900  '>
      <div className='flex items-center gap-2.5'>
        <div className='hover:bg-slate-200 p-2 rounded-full cursor-pointer mr-1.5'>
          <PinterestLogo classProps='w-[21px] h-[21px]' />
        </div>
        <NavUser loginAuth={loginAuth} />
      </div>

      <SearchInput />

      {loginAuth ? <UserLoggedIn /> : <HeaderAuth />}
    </header>
  );
};
