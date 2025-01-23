import React, { useRef, useState } from 'react';
import Counter from '@/app/components/Basic/Counter';
import Tooltip from '@/app/components/Header/ToolTip';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import LikeActiveIcon from '@/app/interfaces/components/icons/LikeActiveIcon';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import ThreePointsIcon from '@/app/interfaces/components/icons/ThreePointsIcon';
import ModalComment from './ModalComment';
import { CommentInterface } from '@/app/domain/types/pins-structure';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface OptionCommentProps {
  elem: CommentInterface;
  handleCommentsCount: () => void;
  top?: boolean;
}

const OptionsComment = ({
  elem,
  handleCommentsCount,
  top,
}: OptionCommentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuth, openRegisterModal, postToggleLikeComment, t } =
    useAppsStore();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const likes = Number(elem.likes_count);
  const alreadyLiked = elem.already_liked;

  const handleToggleLikeComment = async () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    await postToggleLikeComment(elem.id);

    const updatedLikes = alreadyLiked ? likes - 1 : likes + 1;
    elem.likes_count = updatedLikes.toString();
    elem.already_liked = !alreadyLiked;
  };

  const openModal = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className='flex flex-row gap-2 items-center'>
      <span className='text-gray-500 text-xs font-semibold cursor-pointer hover:underline'>
        {t?.comment.reply || 'Responder'}
      </span>
      <div className='flex flex-row-reverse gap-1 items-center'>
        {likes > 0 && <Counter value={likes} className='text-black text-xs' />}
        <Tooltip
          tooltipText={t?.comment.like || 'Me encanta'}
          className='!top-6'
        >
          <ButtonStyled
            className='!px-0 !py-0'
            handleClick={handleToggleLikeComment}
          >
            {alreadyLiked ? (
              <LikeActiveIcon classProps='w-3 h-3' />
            ) : (
              <LikeIcon classProps='w-3 h-3' />
            )}
          </ButtonStyled>
        </Tooltip>
      </div>
      <div className='relative flex items-center'>
        <ButtonStyled
          className='!p-0'
          handleClick={openModal}
          btnRef={buttonRef}
        >
          <div className='hover:bg-gray-200 p-1 rounded-full cursor-pointer transition'>
            <ThreePointsIcon className='w-3 h-3' />
          </div>
        </ButtonStyled>
        {isModalOpen && (
          <ModalComment
            onClose={openModal}
            isModalOpen={isModalOpen}
            buttonRef={buttonRef}
            elem={elem}
            handleCommentsCount={handleCommentsCount}
            top={top}
          />
        )}
      </div>
    </div>
  );
};

export default OptionsComment;
