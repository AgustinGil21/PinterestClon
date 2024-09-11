import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface CategoryPinInterface {
  imagePreview: string | null;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const CategoryPin = ({ imagePreview, register }: CategoryPinInterface) => {
  const isReadOnly = !imagePreview;
  return (
    <div className='flex flex-col gap-2'>
      <InputLabelStyled
        register={register}
        textLabel='Etiqueta de categoria '
        infoName='category'
        type='text'
        readOnly={isReadOnly}
        className={`${
          isReadOnly &&
          'opacity-75 bg-transparent border-gray-300  outline-none outline-transparent cursor-default'
        }`}
      />
      <span
        className={`text-[10px] text-gray-600 px-2 dark:text-white ${
          isReadOnly && 'hidden'
        }`}
      >
        No te preocupes. Los demás usuarios no verán tus etiquetas.
      </span>
    </div>
  );
};

export default CategoryPin;
