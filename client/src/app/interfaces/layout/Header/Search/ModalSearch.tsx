import { SuggestionsInterface } from '@/app/domain/types/pins-structure';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import React, { RefObject, useEffect, useState } from 'react';
import SearchTitle from './SearchTitle';
import SearchUser from './SearchUser';
import SavePinsButton from './SavePinsButton';
import CategoryGroups from './CategoryGroups';
import LabelsSearch from './LabelsSearch';
import useSearchData from '@/app/interfaces/hooks/useSearchData';

interface ModalStateProps {
  modalRef: RefObject<HTMLDivElement>;
  pinsSuggestions: SuggestionsInterface[];
  page: number;
  limit: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (query: string) => void;
}

const ModalSearch = ({
  modalRef,
  pinsSuggestions,
  handleSearch,
  limit,
  setModal,
}: ModalStateProps) => {
  const { valuesSearch, value } = useAppsStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = async (elem: string) => {
    handleSearch(elem);
    setModal(false);
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
              <div key={index}>
                {elem.user_username ? (
                  <SearchUser
                    elem={elem}
                    index={index}
                    setModal={setModal}
                    key={elem.user_username}
                  />
                ) : (
                  <SearchTitle
                    elem={elem}
                    index={index}
                    handleClick={handleClick}
                    key={`${elem.pin_alt_text}-${index}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {value.length > 0 && <SavePinsButton setModal={setModal} />}
      </div>
    </>
  );
};

export default ModalSearch;
