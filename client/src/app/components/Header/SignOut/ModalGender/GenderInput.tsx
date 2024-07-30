import InputStyled from '@/app/components/Basic/InputStyled';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface GenderInputInterface {
  register: UseFormRegister<FieldValues>;
  value: string;
  textLabel: string;
  defaultChecked?: boolean;
}

const GenderInput = ({ register, value, textLabel }: GenderInputInterface) => {
  return (
    <div className='flex flex-row-reverse gap-4 items-center'>
      <label
        htmlFor={textLabel}
        className='text-black dark:text-white text-nowrap'
      >
        {textLabel}
      </label>
      <InputStyled
        defaultChecked
        type='radio'
        register={register}
        value={value}
        classProps='form-radio h-4 w-4 text-black focus:ring-blue-500 custom-radio'
      />
    </div>
  );
};

export default GenderInput;
