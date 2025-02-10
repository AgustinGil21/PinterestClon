import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '../../../components/icons/SearchIcon';
import ModalSearch from './ModalSearch';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import CloseSearchIcon from '@/app/interfaces/components/icons/CloseSearchIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import useSearchData from '@/app/interfaces/hooks/useSearchData';

const SearchInput = () => {
  const {
    value,
    updateDataSearch,
    suggestions,
    isModalSearchHeaderOpen,
    modalSearchHeaderOpen,
    getSuggestions,
    previousPin,
    page,
    t,
  } = useAppsStore();
  const { handleSearch } = useSearchData();
  const [isFocused, setIsFocused] = useState(false);
  const [valueCurrent, setValueCurrent] = useState(value);
  const [pinsSuggestions, setPinsSuggestions] = useState(suggestions);

  const limit = 25;
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const { modalRef } = useCloseModal({
    setModal: modalSearchHeaderOpen,
    inputRef,
  });

  useEffect(() => {
    setValueCurrent('');
  }, [value]);

  useEffect(() => {
    getSuggestions();
  }, [previousPin]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateDataSearch('value', newValue);
    localStorage.setItem('searchInputValue', newValue);
  };

  const handleClick = () => {
    modalSearchHeaderOpen();
    updateDataSearch('value', '');
    localStorage.removeItem('searchInputValue');
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    modalSearchHeaderOpen();
  };

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (value === '' || valueCurrent === value) return;
    setValueCurrent(value);
    handleSearch(value);

    modalSearchHeaderOpen();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (value) {
        handleSubmit(event);
      }
    }
  };

  useEffect(() => {
    const filteredPins = suggestions.filter((elem: any) => {
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
      localStorage.removeItem('searchInputValue');
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
            isFocused ? 'pl-4 pr-12' : 'px-8'
          } text-sm rounded-3xl bg-searchBg focus:outline-search focus:ring-[3px] focus:outline-none font-sans`}
          placeholder={t?.header['search-input'].placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={(e) => handleOpenModal(e)}
          onKeyDown={handleKeyDown}
        />
        {!isFocused && (
          <div className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500'>
            <SearchIcon classname={'gray'} width={13} height={13} />
          </div>
        )}

        {isModalSearchHeaderOpen && (
          <button
            type='button'
            className='absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer hover:bg-gray-300 px-3 py-[12.1px] rounded-full'
            onClick={handleClick}
          >
            <CloseSearchIcon />
          </button>
        )}

        {isModalSearchHeaderOpen && (
          <ModalSearch
            modalRef={modalRef}
            pinsSuggestions={pinsSuggestions}
            setModal={modalSearchHeaderOpen}
            handleSearch={handleSearch}
            page={page}
            limit={limit}
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
