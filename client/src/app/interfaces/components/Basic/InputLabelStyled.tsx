import InputStyled from '@/app/interfaces/components/Basic/InputStyled';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';

import {
  UseFormRegister,
  FieldValues,
  Merge,
  FieldError,
  FieldErrorsImpl,
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
}: RegisterInterface) => {
  return (
    <div className='w-full '>
      <label
        className='text-black text-[12px] px-2 dark:text-white'
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
        classProps={`w-full rounded-[13px] py-2 px-3  border-gray-300 border-[1px] text-sm ${className}`}
      />

      {errors?.message && (
        <ErrorStyled>{errors?.message as string}</ErrorStyled>
      )}
    </div>
  );
};

export default InputLabelStyled;
