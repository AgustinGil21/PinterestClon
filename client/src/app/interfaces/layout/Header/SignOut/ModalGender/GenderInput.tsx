import InputStyled from '@/app/interfaces/components/Basic/InputStyled';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface GenderInputInterface {
  register: UseFormRegister<FieldValues>;
  value: string;
  textLabel: string;
  defaultChecked?: boolean;
  id: string;
}

const GenderInput = ({
  register,
  value,
  textLabel,
  id,
}: GenderInputInterface) => {
  return (
    <div className='flex flex-row-reverse gap-4 items-center'>
      <label
        htmlFor={textLabel}
        className='text-black dark:text-white text-nowrap'
      >
        {textLabel}
      </label>
      <InputStyled
        id={id}
        defaultChecked
        type='radio'
        register={register}
        infoName='radio'
        value={value}
        classProps='form-radio h-4 w-4 text-black focus:ring-blue-500 custom-radio'
      />
    </div>
  );
};

export default GenderInput;
