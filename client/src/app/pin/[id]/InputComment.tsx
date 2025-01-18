import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { CreateCommentSchema } from '@/app/infrastructure/schemas/validation-form';
import EmojiIcon from '@/app/interfaces/components/icons/EmojiIcon';
import EmojiPicker from 'emoji-picker-react';
import { useState, useEffect, useRef } from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import SendCommentIcon from '@/app/interfaces/components/icons/SendCommentIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { isValid } from 'zod';
import useCloseModal from '@/app/hooks/useCloseModal';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  handleCommentsCount: () => void;
}

const InputComment = ({ handleCommentsCount }: Props) => {
  const { watch, register, errors, setValue, getValues } = useFormHook({
    schema: CreateCommentSchema,
    event: 'onChange',
  });
  const {
    postCreateComment,
    pinData,
    updateFrontComment,
    getUserOwnerProfile,
    dataOwnerProfile,
    openRegisterModal,
    isAuth,
  } = useAppsStore();
  const btnRef = useRef(null);
  const tempId = uuidv4();

  const handleEmojiModal = () => setEmojiIsOpen(false);

  const { modalRef } = useCloseModal({
    setModal: handleEmojiModal,
    buttonRef: btnRef,
  });

  useEffect(() => {
    getUserOwnerProfile();
  }, []);

  const [emojiIsOpen, setEmojiIsOpen] = useState(false);

  const handleEmojiClick = (value: any) => {
    const currentValue = getValues('comment') || '';
    setValue('comment', currentValue + value.emoji);
  };

  const handleEmojiIsOpen = () => setEmojiIsOpen(!emojiIsOpen);

  const comment = watch('comment') || '';

  useEffect(() => {
    setValue('comment', comment);
  }, [comment, setValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuth) {
      openRegisterModal();
      return;
    }
    if (!comment || comment.trim() === '' || !isValid) {
      return;
    }

    const newComment = {
      id: tempId,
      content: comment,
      created_at: new Date().toLocaleString(),
      likes_count: 0,
      already_liked: false,
      username: dataOwnerProfile.username,
      avatar: dataOwnerProfile.avatar,
      avatar_letter: dataOwnerProfile.avatar_letter,
      avatar_letter_color: dataOwnerProfile.avatar_letter_color,
      avatar_background: dataOwnerProfile.avatar_background,
      its_yours: true,
    };

    try {
      updateFrontComment(newComment);
      await postCreateComment({
        id: pinData.id,
        content: comment,
      });

      setValue('comment', '');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }

    setEmojiIsOpen(false);

    handleCommentsCount();
  };

  return (
    <form className='w-full relative' onSubmit={handleSubmit}>
      <InputLabelStyled
        type='text'
        register={register}
        errors={errors.comment}
        infoName='comment'
        className='w-full px-3 py-3 rounded-3xl border-[1px] bg-gray-200 text-sm pr-[86px]'
        placeHolder='Agregar un comentario'
        value={comment}
      />

      {emojiIsOpen && (
        <div className='absolute z-50 bottom-[50px] right-0' ref={modalRef}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div className='pr-2 flex flex-row items-center absolute top-1/2 right-3 transform -translate-y-1/2'>
        <ButtonStyled
          className='rounded-full flex items-center justify-center hover:bg-gray-300 p-2'
          handleClick={handleEmojiIsOpen}
          type='button'
          btnRef={btnRef}
        >
          <EmojiIcon />
        </ButtonStyled>

        {comment.length > 0 && (
          <ButtonStyled
            className='bg-redPinterestBg px-1 py-1 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700'
            type='submit'
          >
            <SendCommentIcon />
          </ButtonStyled>
        )}
      </div>
    </form>
  );
};

export default InputComment;
