import React from 'react';
import InputStyled from '@/app/interfaces/components/Basic/InputStyled';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

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
  imagePreview,
}: RegisterInterface) => {
  return (
    <div className='w-full'>
      <label
        className={`text-black text-[12px] px-2 dark:text-white ${
          readOnly ? 'text-gray-300' : ' text-black'
        } `}
        htmlFor={id}
      >
        {textLabel}
      </label>

      <InputStyled
        min={min}
        max={max}
        id={id}
        value={value}
        register={register}
        type={type}
        infoName={infoName}
        placeHolder={textLabel}
        disabled={disabled}
        readOnly={readOnly}
        classProps={`w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm ${className} ${
          readOnly ? 'bg-gray-100' : ''
        }`}
      />

      {errors?.message && (
        <ErrorStyled>{errors?.message as string}</ErrorStyled>
      )}
    </div>
  );
};

export default InputLabelStyled;
