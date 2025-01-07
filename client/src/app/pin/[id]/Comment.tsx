import { useState } from 'react';
import AvatarUser from '@/app/interfaces/layout/Header/Avatar/AvatarUser';
import RelativeTime from '@/app/components/Basic/RelativeTime';
import { CommentTextExtend } from './CommentTextExtend';
import Counter from '@/app/components/Basic/Counter';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import { CommentInterface } from '@/app/domain/types/pins-structure';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import Tooltip from '@/app/components/Header/ToolTip';
import LikeActiveIcon from '@/app/interfaces/components/icons/LikeActiveIcon';
import { useRouter } from 'next/navigation';

interface CommentProps {
  elem: CommentInterface;
}

const Comment = ({ elem }: CommentProps) => {
  const [likes, setLikes] = useState(Number(elem.likes_count));
  const [alreadyLiked, setAlreadyLiked] = useState(elem.already_liked);
  const { postToggleLikeComment, isAuth, openRegisterModal } = useAppsStore();
  const router = useRouter();

  const handleToggleLikeComment = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    setAlreadyLiked(!alreadyLiked);
    console.log(elem.already_liked);
    setLikes((prev) => prev + (alreadyLiked ? -1 : 1));

    postToggleLikeComment(elem.id);
  };

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
        <div className='flex flex-row gap-2 mt-[-3px]  items-center'>
          <span className='text-[#b3b3b3] text-[11px] font-semibold cursor-pointer'>
            Responder
          </span>
          <div className='flex flex-row-reverse gap-[2px]  items-center'>
            {likes > 0 && (
              <Counter
                value={Number(likes) || 0}
                className='text-black text-[11px]'
              />
            )}
            <Tooltip tooltipText='Me encanta' className='!top-6'>
              <ButtonStyled
                className='!px-0 !py-0'
                handleClick={handleToggleLikeComment}
              >
                {' '}
                {alreadyLiked ? (
                  <LikeActiveIcon
                    classProps={`
                  w-[12px] h-[12px]`}
                  />
                ) : (
                  <LikeIcon
                    classProps={`
                     
                     w-[12px] h-[12px]`}
                  />
                )}
              </ButtonStyled>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
