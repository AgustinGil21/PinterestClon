import { SuggestionsInterface } from '@/app/domain/types/pins-structure';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import React, { RefObject, useEffect } from 'react';
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
    resetPage,
    getSearchPins,
    getCategoriesPin,
    updateDataSearch,
  } = useAppsStore();

  useEffect(() => {
    getCategoriesPin();
    console.log(categoriesPin);
  }, []);

  const router = useRouter();

  const handleClick = async (elem: string) => {
    console.log(elem);
    console.log(value);

    await getSearchPins(elem, 1, limit);

    updateDataSearch('value', elem);
    console.log(page);
    router.push(`/search?query=${elem}`);

    updateValueSearchInput(elem);
    setModal(false);
  };

  return (
    <>
      <div className='fixed inset-0 bg-black opacity-50 z-40 top-[62px]'></div>
      <div
        ref={modalRef}
        className='absolute bg-white dark:bg-gray-900 w-[100%] h-auto min-h-[108px] max-h-[670px] overflow-y-auto rounded-b-xl z-[100] py-2'
        style={{ top: '45px', left: '46%', transform: 'translateX(-46%)' }}
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
