import InputLabelStyled from '../../interfaces/components/Basic/InputLabelStyled';
import useFormHook from '../../interfaces/hooks/useFormHook';
import { CreateCommentSchema } from '../../infrastructure/schemas/validation-form';
import EmojiIcon from '../../interfaces/components/icons/EmojiIcon';
import EmojiPicker from 'emoji-picker-react';
import { useState, useEffect, useRef } from 'react';
import ButtonStyled from '../../interfaces/components/Basic/ButtonStyled';
import SendCommentIcon from '../../interfaces/components/icons/SendCommentIcon';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import { isValid } from 'zod';
import useCloseModal from '../../hooks/useCloseModal';
import { v4 as uuidv4 } from 'uuid';
import { useGetScreenSize } from '../../hooks/useGetScreenSize';

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
    commentsState,
    isAuth,
    t,
  } = useAppsStore();
  const { width } = useGetScreenSize();
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
      await postCreateComment(
        {
          id: pinData.id,
          content: comment,
        },
        newComment.id
      );

      console.log(newComment.id);

      setValue('comment', '');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }

    handleCommentsCount();
    setEmojiIsOpen(false);
  };

  return (
    <form className='w-full relative mb-3 md:mb-0' onSubmit={handleSubmit}>
      <InputLabelStyled
        type='text'
        register={register}
        errors={errors.comment}
        infoName='comment'
        className={`w-full px-3 py-3 rounded-3xl border-[1px] bg-gray-200 text-sm ${
          comment.length > 0 ? 'pr-[100px]' : ''
        }`}
        placeHolder={t?.comment['input-placeholder'] || 'Agregar un comentario'}
        value={comment}
      />

      {emojiIsOpen && (
        <div className='absolute z-50 bottom-[50px] right-0' ref={modalRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={width > 768 ? 350 : 330}
            height={width > 768 ? 400 : 350}
          />
        </div>
      )}

      <div className='pr-2 flex flex-row items-center absolute justify-center top-1/2 right-3 transform -translate-y-1/2'>
        <ButtonStyled
          className='rounded-full flex items-center justify-center hover:bg-gray-300 !p-2'
          handleClick={handleEmojiIsOpen}
          type='button'
          btnRef={btnRef}
        >
          <EmojiIcon />
        </ButtonStyled>

        {comment.length > 0 && (
          <ButtonStyled
            className='bg-redPinterestBg !p-2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700'
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
