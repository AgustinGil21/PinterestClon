import { PinInterface } from '@/app/domain/types/pins-structure';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import SearchIcon from '@/app/interfaces/components/icons/SearchIcon';
import XValueModalIcon from '@/app/interfaces/components/icons/XValueModalIcon';
import React, { RefObject } from 'react';

interface ModalStateProps {
  modalRef: RefObject<HTMLDivElement>;
  pinsSuggestions: PinInterface[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ModalSearch = ({
  modalRef,
  pinsSuggestions,
  handleSubmit,
}: ModalStateProps) => {
  const { valuesSearch, removeValueFromSearch, updateValueInputSearch, value } =
    useAppsStore();

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    elem: string
  ) => {
    updateValueInputSearch(elem);
    // handleSubmit(event);
  };

  return (
    <>
      <div className='fixed inset-0 bg-black opacity-50 z-40 top-[62px]'></div>
      <div
        ref={modalRef}
        className='absolute bg-white dark:bg-gray-900 w-[100%] h-auto rounded-b-xl z-[100] py-4'
        style={{ top: '45px', left: '46%', transform: 'translateX(-46%)' }}
      >
        {valuesSearch.length > 0 && value.length <= 0 && (
          <div className='px-7'>
            <span className='font-semibold text-[12.5px]'>
              Búsquedas recientes
            </span>
            <div className='flex gap-1 flex-row flex-wrap mt-2'>
              {valuesSearch.map((elem, index) => (
                <div
                  onClick={(e) => handleClick(e, elem)}
                  key={index}
                  className='bg-gray-200 rounded-2xl p-1 px-3 flex flex-row items-center gap-3 hover:bg-gray-300 cursor-pointer'
                >
                  <span className='text-[13px]'>{elem}</span>
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
          </div>
        )}

        {value.length > 0 && (
          <div className='mt-1.5'>
            {pinsSuggestions.map((elem) => (
              <div
                key={elem.pin_id}
                className='p-2 text-sm flex flex-row items-center gap-5 hover:bg-gray-200 w-full px-7 cursor-pointer'
              >
                <SearchIcon classname='black' width={9.5} height={9.5} />
                <span>{elem.alt_text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ModalSearch;
