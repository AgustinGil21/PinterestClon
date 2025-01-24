import { SuggestionsInterface } from '@/app/domain/types/pins-structure';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import React, { RefObject, useEffect, useState } from 'react';
import SearchTitle from './SearchTitle';
import SearchUser from './SearchUser';
import SavePinsButton from './SavePinsButton';
import CategoryGroups from './CategoryGroups';
import LabelsSearch from './LabelsSearch';

interface ModalStateProps {
  modalRef: RefObject<HTMLDivElement>;
  pinsSuggestions: SuggestionsInterface[];
  page: number;
  limit: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSearch = ({
  modalRef,
  pinsSuggestions,
  limit,
  setModal,
}: ModalStateProps) => {
  const {
    valuesSearch,
    updateValueSearchInput,
    value,
    categoriesPin,
    page,
    getSearchPins,
    searchBoards,
    searchedBoards,
    filterState,
    getCategoriesPin,
    updateDataSearch,
  } = useAppsStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getCategoriesPin();
    console.log(categoriesPin);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    handleResize(); // Set the initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const router = useRouter();

  const handleClick = async (elem: string) => {
    updateDataSearch('value', elem);
    updateValueSearchInput(elem);
    localStorage.setItem('searchInputValue', elem);
    setModal(false);
    if (filterState === 'pines') {
      router.push(`/search?query=${elem}`);
      await getSearchPins(elem, 1, limit);
    }

    if (filterState === 'tableros') {
      router.push(`/search?query=${elem}`);
      await searchBoards({ value: elem, page: 1, limit: limit });
    }
  };

  return (
    <>
      <div className='fixed inset-0 bg-black opacity-50 z-40 top-[62px]'></div>
      <div
        ref={modalRef}
        className={` bg-white dark:bg-gray-900 w-[100%]  h-auto min-h-[108px] max-h-[670px] overflow-y-auto rounded-b-xl z-[40] py-2  ${
          isMobile
            ? 'w-full left-0 fixed top-[61px]'
            : 'w-[100%] left-[46%] translate-x-[-46%] absolute top-[45px]'
        }`}
      >
        {value.length <= 0 && (
          <div className='px-7'>
            {valuesSearch.length > 0 && (
              <LabelsSearch handleClick={handleClick} />
            )}

            <CategoryGroups setModal={setModal} />
          </div>
        )}

        {value.length > 0 && (
          <div className='mt-1.5 dark:text-white'>
            {pinsSuggestions.map((elem, index) => (
              <>
                {elem.user_username ? (
                  <SearchUser elem={elem} index={index} setModal={setModal} />
                ) : (
                  <SearchTitle
                    elem={elem}
                    index={index}
                    handleClick={handleClick}
                  />
                )}
              </>
            ))}
          </div>
        )}
        {value.length > 0 && <SavePinsButton setModal={setModal} />}
      </div>
    </>
  );
};

export default ModalSearch;
