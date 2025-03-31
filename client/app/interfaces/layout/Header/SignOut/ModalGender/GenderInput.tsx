import InputStyled from '../../../../components/Basic/InputStyled';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface GenderInputInterface {
  register?: UseFormRegister<FieldValues>;
  value?: string;
  textLabel?: string;
  defaultChecked?: boolean;
  id?: string;
  checked?: boolean;
  defaultValue?: string;
}

const GenderInput = ({
  register,
  value,
  textLabel,
  id,
  checked,
  defaultValue,
}: GenderInputInterface) => {
  return (
    <div className='flex flex-row-reverse gap-2 items-center'>
      <label
        htmlFor={id}
        className='text-black text-sm dark:text-white text-nowrap hover:cursor-pointer'
      >
        {textLabel}
      </label>
      <InputStyled
        defaultValue={defaultValue}
        id={id}
        defaultChecked
        checked={checked}
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
