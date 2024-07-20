'use client';
import { useState } from 'react';
import { PinterestLogo } from '../icons/PinterestLogo';
import Link from 'next/link';
import SearchIcon from '../icons/SearchIcon';

export const Header = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className='w-full  text-white py-3 flex gap-3 px-5 items-center '>
      <div className='flex items-center gap-2'>
        <div className='hover:bg-slate-200 p-2 rounded-full cursor-pointer'>
          <PinterestLogo />
        </div>
        <div>
          <nav>
            <ul className='text-black flex gap-6 text-sm '>
              <li>
                <Link href={'/#'}>Inicio</Link>
              </li>
              <li>
                <Link href={'/#'}>Explorar</Link>
              </li>
              <li>
                <Link href={'/#'}>Crear</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className='w-full relative text-black'>
        <input
          type='text'
          className={`w-full p-2 ${
            isFocused ? 'px-4' : 'px-8'
          } text-sm rounded-3xl bg-search-input focus:border-outline-search focus:ring-2 focus:outline-none font-sans`}
          placeholder='Buscar'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!isFocused && (
          <div className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500'>
            <SearchIcon />
          </div>
        )}
      </div>
    </header>
  );
};
