import { SuggestionsInterface } from '@/app/domain/types/pins-structure';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import XValueModalIcon from '@/app/interfaces/components/icons/XValueModalIcon';
import { useRouter } from 'next/navigation';
import React, { RefObject, useEffect } from 'react';
import SearchTitle from './SearchTitle';
import SearchUser from './SearchUser';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useMemo } from 'react';
import CardCategory from './CardCategory';

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

  page,
  limit,
  setModal,
}: ModalStateProps) => {
  const {
    valuesSearch,
    removeValueFromSearch,
    updateValueInputSearch,
    value,
    getSearchPins,
    getCategoriesPin,
    categoriesPin,
    userPublicData,
  } = useAppsStore();

  useEffect(() => {
    getCategoriesPin();
  }, []);

  const categories = useMemo(
    () => categoriesPin.sort(() => Math.random() - 0.5).slice(0, 8),
    [categoriesPin]
  );

  const categories2 = useMemo(
    () => categoriesPin.sort(() => Math.random() - 0.5).slice(9, 17),
    [categoriesPin]
  );

  const router = useRouter();

  const handleClick = async (elem: string) => {
    updateValueInputSearch(elem);

    await getSearchPins(elem, page, limit);
    router.push(`/search?query=${elem}`);
    setModal(false);
  };

  return (
    <>
      <div className='fixed inset-0 bg-black opacity-50 z-40 top-[62px]'></div>
      <div
        ref={modalRef}
        className='absolute bg-white dark:bg-gray-900 w-[100%] h-auto min-h-[108px] max-h-[670px] overflow-y-auto rounded-b-xl z-[100] py-4'
        style={{ top: '45px', left: '46%', transform: 'translateX(-46%)' }}
      >
        {valuesSearch.length > 0 && value.length <= 0 && (
          <div className='px-7'>
            <span className='font-semibold text-sm my-4'>
              Búsquedas recientes
            </span>
            <div className='flex gap-1 flex-row flex-wrap mt-2'>
              {valuesSearch.map((elem, index) => (
                <div
                  onClick={() => handleClick(elem)}
                  key={index}
                  className='bg-gray-200 rounded-2xl p-1 px-3 flex flex-row items-center gap-3 hover:bg-gray-300 cursor-pointer'
                >
                  <span className='text-[14px]'>{elem}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValueFromSearch(elem);
                    }}
                  >
                    <XValueModalIcon />
                  </button>
                </div>
              ))}
            </div>

            <div className=' mt-5'>
              {userPublicData?.username && (
                <>
                  <h3 className='text-sm font-semibold my-2'>Ideas para ti</h3>
                  <div className='flex  flex-wrap  gap-2 '>
                    {categories.map((elem) => (
                      <div
                        key={elem.id}
                        className='flex-wrap w-[calc(20%-0.5rem)] p-1'
                      >
                        <CardCategory elem={elem} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 className='text-sm font-semibold my-3 mt-6'>
                Populares en Pinterest
              </h3>
              <div className='flex flex-wrap gap-2'>
                {categories2.map((elem) => (
                  <div
                    key={elem.id}
                    className='flex-wrap w-[calc(20%-0.5rem)] p-1'
                  >
                    <CardCategory elem={elem} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {value.length > 0 && (
          <div className='mt-1.5'>
            {pinsSuggestions.map((elem, index) => (
              <>
                {elem.user_username ? (
                  <SearchUser elem={elem} index={index} />
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
        {value.length > 0 && (
          <div className='w-full px-6 4 mt-4'>
            <hr className='w-full border-t-[1.5px] border-gray-300' />
            <div className='w-full flex justify-between flex-row mt-4  items-center'>
              <span className='text-sm font-semibold'>
                ¿Estás buscando ideas que guardaste?
              </span>
              <ButtonStyled
                type='button'
                className='font-semibold bg-buttonGreyBg hover:bg-gray-300 text-[11px]'
              >
                Buscar tus Pines
              </ButtonStyled>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalSearch;
