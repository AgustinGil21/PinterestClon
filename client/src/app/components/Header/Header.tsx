'use client';
import { useState } from 'react';
import PinterestLogo from '../icons/PinterestLogo';
import SearchInput from './SearchInput';
import NavUser from './NavUser';
import HeaderAuth from './HeaderAuth';
import { UserLoggedIn } from './UserLoggedIn';

export const Header = () => {
  const [loginAuth, setLoginAuth] = useState(true);

  return (
    <header className='w-full  text-white py-3 flex gap-3 px-5 items-center '>
      <div className='flex items-center gap-2'>
        <PinterestLogo />
        <NavUser loginAuth={loginAuth} />
      </div>

      <SearchInput />

      {loginAuth ? <UserLoggedIn /> : <HeaderAuth />}
    </header>
  );
};
