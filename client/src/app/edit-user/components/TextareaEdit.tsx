import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface TextareaInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const TextareaEdit = ({ errors, register }: TextareaInterface) => {
  return (
    <div>
      <label className='text-[12px]  px-2'>Informacion</label>
      <textarea
        {...register('content')}
        placeholder='Cuenta tu historia'
        className='w-full rounded-[13px] py-2 px-3 h-[100px]  border-gray-300 border-[1px] text-sm outline-outline-search resize-none'
      ></textarea>
      {errors.content && (
        <ErrorStyled>{errors.content.message as string}</ErrorStyled>
      )}
    </div>
  );
};

export default TextareaEdit;
