import React from 'react';
import InputStyled from './InputStyled';
import ErrorStyled from './ErrorStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import { TLang } from '../../../global-interfaces/global-interfaces';

interface RegisterInterface {
  register?: UseFormRegister<FieldValues>;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  type: string;
  textLabel?: string;
  infoName: string;
  className?: string;
  id?: string;
  value?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  readOnly?: boolean;
  imagePreview?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  placeHolder?: string;
  lang?: TLang;
}

const InputLabelStyled = ({
  register,
  errors,
  type,
  infoName,
  textLabel,
  className,
  id,
  value,
  min,
  max,
  disabled,
  readOnly,
  placeHolder,
  imagePreview,
  onFocus,
  onBlur,
  onClick,
  lang,
}: RegisterInterface) => {
  return (
    <div className='w-full flex flex-col'>
      <label
        className={`text-black text-[12px] px-2 dark:text-white ${
          readOnly ? 'text-gray-300' : ' text-black'
        } `}
        htmlFor={id}
      >
        {textLabel}
      </label>

      <InputStyled
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        min={min}
        max={max}
        id={id}
        value={value}
        register={register}
        type={type}
        infoName={infoName}
        placeHolder={placeHolder}
        disabled={disabled}
        readOnly={readOnly}
        classProps={`${className} ${readOnly ? 'bg-gray-100' : ''}`}
        lang={lang}
      />

      {errors?.message && (
        <ErrorStyled>{errors?.message as string}</ErrorStyled>
      )}
    </div>
  );
};

export default InputLabelStyled;
