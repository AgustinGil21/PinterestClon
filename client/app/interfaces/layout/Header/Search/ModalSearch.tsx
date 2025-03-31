import { SuggestionsInterface } from '../../../../domain/types/pins-structure';
import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';
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
  setModal: () => void;
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
  const [suggestions, setSuggestions] = useState(pinsSuggestions);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const uniqueSuggestions = Array.from(
      new Map(
        pinsSuggestions.map((item) => [
          item.user_username || item.pin_alt_text,
          item,
        ])
      ).values()
    );

    setSuggestions(uniqueSuggestions);
  }, [pinsSuggestions]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = async (elem: string) => {
    setModal();
    handleSearch(elem);
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
            {suggestions.map((elem, index) => (
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
