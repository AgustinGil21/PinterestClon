'use client';
import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../components/icons/SearchIcon';
import ModalSearch from './ModalSearch';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import CloseSearchIcon from '@/app/interfaces/components/icons/CloseSearchIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

const SearchInput = () => {
  const {
    value,
    updateValueInputSearch,
    getSearchPins,
    homePins,
    updateValuesSearch,
  } = useAppsStore();
  const [isFocused, setIsFocused] = useState(false);
  const [modalState, setModal] = useState(false);
  const [pinsSuggestions, setPinsSuggestions] = useState(homePins);
  const [page, setPage] = useState(1);
  const limit = 25;
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement>(null);
  const { modalRef } = useCloseModal({ setModal, inputRef });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === '') return;

    updateValuesSearch(value);
    await getSearchPins(value, page, limit);
    router.push(`/search?query=${value}`);
    setModal(false);
  };

  useEffect(() => {
    if (page === 1) return;
    getSearchPins(value, page, limit);
  }, [page, value]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValueInputSearch(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filteredPins = homePins.filter((elem) =>
      elem.alt_text.toLowerCase().includes(value.toLowerCase())
    );
    setPinsSuggestions(filteredPins);
  }, [value, homePins]);

  useEffect(() => {
    if (!pathname.startsWith('/search')) {
      updateValueInputSearch('');
    }
  }, [pathname]);

  return (
    <form className='w-full' onSubmit={handleSubmit}>
      <div className='w-full relative text-black'>
        <input
          ref={inputRef}
          onChange={handleOnChange}
          value={value}
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
            <SearchIcon classname={'gray'} width={13} height={13} />
          </div>
        )}

        {modalState && (
          <button
            type='button'
            className='absolute top-1/2 right-[3px] transform -translate-y-1/2 cursor-pointer hover:bg-gray-300 p-2 rounded-full'
            onClick={() => setModal(false)}
          >
            <CloseSearchIcon />
          </button>
        )}

        {modalState && (
          <ModalSearch
            modalRef={modalRef}
            pinsSuggestions={pinsSuggestions}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
