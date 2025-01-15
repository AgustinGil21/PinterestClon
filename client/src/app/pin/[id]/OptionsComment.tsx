import Counter from '@/app/components/Basic/Counter';
import Tooltip from '@/app/components/Header/ToolTip';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import LikeActiveIcon from '@/app/interfaces/components/icons/LikeActiveIcon';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import ThreePointsIcon from '@/app/interfaces/components/icons/ThreePointsIcon';
import { useState } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { CommentInterface } from '@/app/domain/types/pins-structure';
import ModalComment from './ModalComment';
import { useRef } from 'react';

interface OptionCommentProps {
  elem: CommentInterface;
}

const OptionsComment = ({ elem }: OptionCommentProps) => {
  const [likes, setLikes] = useState(Number(elem.likes_count));
  const [alreadyLiked, setAlreadyLiked] = useState(elem.already_liked);
  const { openRegisterModal, postToggleLikeComment, isAuth } = useAppsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openModal = () => setIsModalOpen(!isModalOpen);

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

  return (
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
      <ButtonStyled
        className='!p-0 relative'
        handleClick={openModal}
        btnRef={buttonRef}
      >
        <div className='hover:bg-gray-200 p-1 rounded-full cursor-pointer'>
          <ThreePointsIcon className='w-[12px] h-[12px]' />
        </div>
        {isModalOpen && (
          <ModalComment onClose={openModal} buttonRef={buttonRef} />
        )}
      </ButtonStyled>
    </div>
  );
};

export default OptionsComment;
