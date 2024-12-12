import { SuggestionsInterface } from '@/app/domain/types/pins-structure';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SearchUserInterface {
  elem: SuggestionsInterface;
  index: number;
  setModal: (value: boolean) => void;
}

const SearchUser = ({ elem, index, setModal }: SearchUserInterface) => {
  const { getSearchUserProfile, updateDataSearch } = useAppsStore();
  const router = useRouter();

  const handleClick = (username: string = 'username') => {
    getSearchUserProfile(username);
    router.push(`/${username}`);
    updateDataSearch('value', '');
    setModal(false);
  };

  return (
    <div
      onClick={() => handleClick(elem.user_username)}
      key={index}
      className='p-2 text-sm flex flex-row items-center gap-5 hover:bg-gray-200 w-full px-5 cursor-pointer  dark:hover:bg-slate-800'
    >
      <div className='flex flex-row gap-2 items-center  '>
        {elem.user_avatar ? (
          <img
            className='w-[30px] h-[30px] rounded-full object-cover '
            src={elem.user_avatar}
            alt={`avatar ${elem.user_username}`}
          />
        ) : (
          <div
            className='rounded-full p-1 w-[30px] h-[30px] flex justify-center items-center'
            style={{
              backgroundColor: elem.user_avatar_background,
            }}
          >
            <span style={{ color: elem.user_avatar_letter_color }}>
              {elem.user_avatar_letter}
            </span>
          </div>
        )}

        {elem.user_name ? (
          <div className='flex flex-col '>
            <span className='text-[13px] font-semibold'>
              {elem.user_name} {elem.user_surname}{' '}
            </span>
            <span className='text-[11px]'>{elem.user_username}</span>
          </div>
        ) : (
          <div className='flex flex-col '>
            <span className='text-[13px] font-bold'>{elem.user_username}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
