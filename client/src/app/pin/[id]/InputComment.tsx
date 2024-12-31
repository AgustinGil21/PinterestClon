import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { CreateCommentSchema } from '@/app/infrastructure/schemas/validation-form';
import EmojiIcon from '@/app/interfaces/components/icons/EmojiIcon';
import EmojiPicker from 'emoji-picker-react';
import { useState, useEffect } from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import SendCommentIcon from '@/app/interfaces/components/icons/SendCommentIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { isValid } from 'zod';

const InputComment = () => {
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
  } = useAppsStore();

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

  const handleClickCreateComment = async () => {
    if (!comment || comment.trim() === '' || !isValid) {
      return;
    }

    const newComment = {
      id: pinData.user_id,
      content: comment,
      created_at: new Date().toISOString(),
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
      await postCreateComment({
        id: pinData.id,
        content: comment,
      });
      updateFrontComment(newComment);
      setValue('comment', '');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  return (
    <div className='w-full relative'>
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
        <div className='absolute z-50 bottom-[50px] right-0'>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div className='pr-2 flex flex-row items-center absolute top-1/2 right-3 transform -translate-y-1/2'>
        <ButtonStyled
          className='rounded-full flex items-center justify-center hover:bg-gray-300 p-2'
          handleClick={handleEmojiIsOpen}
        >
          <EmojiIcon />
        </ButtonStyled>

        {comment.length > 0 && (
          <ButtonStyled
            className='bg-redPinterestBg w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700'
            handleClick={handleClickCreateComment}
          >
            <SendCommentIcon />
          </ButtonStyled>
        )}
      </div>
    </div>
  );
};

export default InputComment;
