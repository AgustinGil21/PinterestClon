'use client';
import { useState } from 'react';
import SearchIcon from '../../../components/icons/SearchIcon';
import ModalSearch from './ModalSearch';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import CloseSearchIcon from '@/app/interfaces/components/icons/CloseSearchIcon';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [modalState, setModal] = useState(false);

  const { modalRef } = useCloseModal({ setModal });

  return (
    <>
      <div className='w-full relative text-black'>
        <input
          type='text'
          className={`w-full p-2 py-[8px] hover:bg-gray-200 ${
            isFocused ? 'px-4' : 'px-8'
          } text-sm rounded-3xl bg-searchBg focus:outline-search focus:ring-[3px] focus:outline-none font-sans`}
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

        {modalState && (
          <button className='absolute top-1/2 right-[3px] transform -translate-y-1/2 cursor-pointer hover:bg-gray-300 p-2  rounded-full'>
            <CloseSearchIcon />
          </button>
        )}

        {modalState && <ModalSearch modalRef={modalRef} />}
      </div>
    </>
  );
};

export default SearchInput;
