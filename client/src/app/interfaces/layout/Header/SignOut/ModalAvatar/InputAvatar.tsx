import InputStyled from '@/app/interfaces/components/Basic/InputStyled';
import React from 'react';
import {
  UseFormRegister,
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from 'react-hook-form';

interface InputAvatarInterface {
  children?: React.ReactNode;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const InputAvatar = ({ children, register, errors }: InputAvatarInterface) => {
  return (
    <>
      <label className={`cursor-pointer`}>
        <InputStyled
          infoName='avatar'
          type='file'
          register={register}
          classProps='absolute opacity-0 w-full cursor-pointer'
        ></InputStyled>
        {children}
      </label>
    </>
  );
};

export default InputAvatar;
