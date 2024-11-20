import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '../../../components/icons/SearchIcon';
import ModalSearch from './ModalSearch';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import CloseSearchIcon from '@/app/interfaces/components/icons/CloseSearchIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const SearchInput = () => {
  const {
    value,
    updateDataSearch,
    getSearchPins,
    suggestions,
    updateValueSearchInput,
    getSuggestions,
    previousPin,
    setPage,
    page,
  } = useAppsStore();
  const [isFocused, setIsFocused] = useState(false);
  const [modalState, setModal] = useState(false);
  const [pinsSuggestions, setPinsSuggestions] = useState(suggestions);

  const limit = 25;
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const { modalRef } = useCloseModal({ setModal, inputRef });

  useEffect(() => {
    getSuggestions();
  }, [previousPin]);

  const handleChange = async (e: any) => {
    updateDataSearch('value', e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === '') return;

    updateDataSearch('categorySelect', '');

    updateValueSearchInput(value);
    await getSearchPins(value, 1, limit);
    router.push(`/search?query=${value}`);
    setModal(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (value) {
        handleSubmit(
          new Event('submit') as unknown as React.FormEvent<HTMLFormElement>
        );
      }
    }
  };

  useEffect(() => {
    const filteredPins = suggestions.filter((elem) => {
      const searchTerm = value.toLowerCase();
      return (
        elem.pin_alt_text?.toLowerCase().includes(searchTerm) ||
        (elem.pin_title && elem.pin_title.toLowerCase().includes(searchTerm)) ||
        (elem.user_name && elem.user_name.toLowerCase().includes(searchTerm)) ||
        (elem.user_surname &&
          elem.user_surname.toLowerCase().includes(searchTerm)) ||
        elem.user_username?.toLowerCase().includes(searchTerm)
      );
    });

    setPinsSuggestions(filteredPins);
  }, [value, suggestions]);

  useEffect(() => {
    if (!pathname.startsWith('/search')) {
      updateDataSearch('value', '');
    }
  }, [pathname]);

  return (
    <form className='w-full' onSubmit={handleSubmit}>
      <div className='w-full relative text-black'>
        <input
          ref={inputRef}
          onChange={(e) => handleChange(e)}
          value={value}
          type='text'
          className={`w-full p-2 py-[10px] hover:bg-gray-200 ${
            isFocused ? 'px-4' : 'px-8'
          } text-sm rounded-3xl bg-searchBg focus:outline-search focus:ring-[3px] focus:outline-none font-sans`}
          placeholder='Buscar'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={() => setModal(true)}
          onKeyDown={handleKeyDown}
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
            setModal={setModal}
            page={page}
            limit={limit}
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
