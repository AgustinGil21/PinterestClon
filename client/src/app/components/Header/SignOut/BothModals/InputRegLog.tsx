import InputStyled from '@/app/components/Basic/InputStyled';
import ErrorStyled from '@/app/components/Basic/ErrorStyled';

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
  textLabel: string;
  infoName: string;
}

const InputRegLog = ({
  register,
  errors,
  type,
  infoName,
  textLabel,
}: RegisterInterface) => {
  return (
    <div className='w-full '>
      <label
        className='text-black text-[12px] px-2 dark:text-white'
        htmlFor={type}
      >
        {textLabel}
      </label>
      <InputStyled
        register={register}
        type={type}
        infoName={infoName}
        placeHolder={textLabel}
        classProps='w-full rounded-[13px] py-2 px-3  border-gray-300 border-[1px] text-sm'
      />

      {errors?.message && (
        <ErrorStyled>{errors?.message as string}</ErrorStyled>
      )}
    </div>
  );
};

export default InputRegLog;
