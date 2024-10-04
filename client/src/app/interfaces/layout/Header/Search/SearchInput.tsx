'use client';
import { useState } from 'react';
import SearchIcon from '../../../components/icons/SearchIcon';
import ModalSearch from './ModalSearch';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import CloseSearchIcon from '@/app/interfaces/components/icons/CloseSearchIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SearchInput = () => {
  const { value, updateValueInputSearch, getSearchPins } = useAppsStore();
  const [isFocused, setIsFocused] = useState(false);
  const [modalState, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 25;
  const router = useRouter();

  const { modalRef } = useCloseModal({ setModal });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (value === '') return;

    router.push(`/search?query=${value}`);
    await getSearchPins(value, page, limit);
    setModal(false);
  };

  useEffect(() => {
    if (page === 1) return;
    getSearchPins(value, page, limit);
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <form className='w-full mt-[18px]' onSubmit={handleSubmit}>
      <div className='w-full relative text-black'>
        <input
          onChange={(e) => updateValueInputSearch(e.target.value)}
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
            <SearchIcon />
          </div>
        )}

        {modalState && (
          <button
            type='button'
            className='absolute top-1/2 right-[3px] transform -translate-y-1/2 cursor-pointer hover:bg-gray-300 p-2  rounded-full'
          >
            <CloseSearchIcon />
          </button>
        )}

        {modalState && <ModalSearch modalRef={modalRef} />}
      </div>
    </form>
  );
};

export default SearchInput;
