import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import CategoryLabels from '../CategoryLabels';
import ModalSearcherCategories from '../ModalSearcherCategories';
import useCategoryPin from './useCategoryPin';

interface CategoryPinInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const CategoryPin = ({
  register,
  watch,
  getValues,
  setValue,
}: CategoryPinInterface) => {
  const {
    handleClickDeleteCategory,
    handleClick,
    handleFocus,
    filterCategories,
    isFocused,
    modalRef,
    imagePreview,
    categoriesSelect,
  } = useCategoryPin({ watch, getValues, setValue });

  return (
    <div ref={modalRef} className='flex flex-col gap-2 relative'>
      <InputLabelStyled
        value={watch('category')}
        register={register}
        textLabel='Etiqueta de categoria'
        infoName='category'
        placeHolder='Buscar una etiqueta'
        type='text'
        onFocus={handleFocus}
        readOnly={!imagePreview}
        className={`w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm  ${
          !imagePreview &&
          'opacity-75 bg-transparent  outline-none outline-transparent cursor-default '
        }`}
      />
      <span
        className={`text-[10px] text-gray-600 px-2 dark:text-white ${
          !imagePreview && 'hidden'
        }`}
      >
        No te preocupes. Los demás usuarios no verán tus etiquetas.
      </span>
      <ModalSearcherCategories
        handleClick={handleClick}
        imagePreview={imagePreview}
        isFocused={isFocused}
        filterCategories={filterCategories}
      />

      <CategoryLabels
        handleClickDeleteCategory={handleClickDeleteCategory}
        categoriesSelect={categoriesSelect}
      />
    </div>
  );
};

export default CategoryPin;
