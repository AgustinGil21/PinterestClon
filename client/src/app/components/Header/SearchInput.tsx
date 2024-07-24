'use client';
import { useState } from 'react';
import SearchIcon from '../icons/SearchIcon';
import ModalSearch from './ModalSearch';
import useCloseModal from '@/app/hooks/useCloseModal';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [modalState, setModal] = useState(false);

  const { modalRef } = useCloseModal({ setModal });

  return (
    <>
      <div className='w-full relative text-black'>
        <input
          type='text'
          className={`w-full p-2 ${
            isFocused ? 'px-4' : 'px-8'
          } text-sm rounded-3xl bg-searchBg focus:border-outline-search focus:ring-2 focus:outline-none font-sans`}
          placeholder='Buscar'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={() => setModal(true)}
        />
        {!isFocused && (
          <div className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500'>
            <SearchIcon />
          </div>
        )}
        {modalState && <ModalSearch modalRef={modalRef} />}
      </div>
    </>
  );
};

export default SearchInput;
