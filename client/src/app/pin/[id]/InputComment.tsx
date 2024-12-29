import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { CreateCommentSchema } from '@/app/infrastructure/schemas/validation-form';
import EmojiIcon from '@/app/interfaces/components/icons/EmojiIcon';
import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react';

const InputComment = () => {
  const {
    watch,
    handleSubmit,
    getValues,
    register,
    errors,
    setValue,
    isValid,
  } = useFormHook({
    schema: CreateCommentSchema,
    event: 'onChange',
  });

  return (
    <div className='w-full relative'>
      <InputLabelStyled
        type='name'
        register={register}
        errors={errors.comment}
        infoName='comment'
        className='w-full px-3 py-3 rounded-3xl border-[1px] bg-gray-200 text-sm pr-10'
        placeHolder='Agregar un comentario'
      />

      <div className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer'>
        <EmojiIcon />
      </div>
    </div>
  );
};

export default InputComment;
