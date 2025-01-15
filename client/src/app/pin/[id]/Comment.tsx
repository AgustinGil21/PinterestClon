import { useState } from 'react';
import AvatarUser from '@/app/interfaces/layout/Header/Avatar/AvatarUser';
import RelativeTime from '@/app/components/Basic/RelativeTime';
import { CommentTextExtend } from './CommentTextExtend';

import { CommentInterface } from '@/app/domain/types/pins-structure';

import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

import { useRouter } from 'next/navigation';
import OptionsComment from './OptionsComment';

interface CommentProps {
  elem: CommentInterface;
}

const Comment = ({ elem }: CommentProps) => {
  const { postToggleLikeComment, isAuth, openRegisterModal } = useAppsStore();
  const router = useRouter();

  const handleClickSearchUser = () => {
    router.push(`/${elem.username}`);
  };

  const createdAt = elem.created_at || new Date().toLocaleDateString();

  return (
    <div className='flex flex-row gap-2 mt-1 h-full'>
      <div onClick={handleClickSearchUser}>
        <AvatarUser
          textSize='text-xs'
          data={elem}
          classProps='max-w-[25px] max-h-[25px] min-w-[25px] min-h-[25px] w-full h-full object-cover rounded-full'
        />
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <h5
            className='text-nowrap font-semibold text-[13px] flex flex-row items-center gap-1.5 cursor-pointer'
            onClick={handleClickSearchUser}
          >
            {elem.username}
            <RelativeTime
              props={{
                date: createdAt,
                lang: 'es',
                className: 'text-[#b3b3b3] text-[11px]',
              }}
            />
          </h5>
          <CommentTextExtend text={elem.content} />
        </div>
        <OptionsComment elem={elem} />
      </div>
    </div>
  );
};

export default Comment;
