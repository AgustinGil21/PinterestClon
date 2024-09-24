import React, { useEffect, useRef, useState } from 'react';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { serviceGetColors } from '@/app/infrastructure/services/service-register';
import CategoryLabels from './CategoryLabels';
import ModalSearcherCategories from './ModalSearcherCategories';

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
    getCategoriesPin,
    categoriesPin,
    updateStateTopicPin,
    imagePreview,
    dataCreatePin,
  } = useAppsStore();
  const [isFocused, setIsFocused] = useState(false);
  const [filterCategories, setFilterCategories] = useState(categoriesPin);
  const [categoriesSelect, setCategoriesSelect] = useState<
    { name: string; color: string }[]
  >([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch categories and update the state
    getCategoriesPin();
    if (!imagePreview) {
      setCategoriesSelect([]);
      updateStateTopicPin([]);
      setValue('category', '');
    }
  }, [getCategoriesPin, imagePreview]);

  useEffect(() => {
    const selectedCategories = categoriesPin
      .filter((category) => dataCreatePin.topics.includes(category.id))
      .map((category) => ({
        name: category.name,
        color: '#000',
      }));
    setCategoriesSelect(selectedCategories);
  }, [dataCreatePin.topics, categoriesPin]);

  useEffect(() => {
    const currentValues = getValues('category') || '';
    const response = categoriesPin.filter((elem) =>
      elem.name.toLowerCase().includes(currentValues.toLowerCase())
    );
    setFilterCategories(response);
  }, [watch('category'), categoriesPin, getValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    if (categoriesSelect.some((elem) => elem.name === value)) return;

    const response = categoriesPin.filter((elem) => elem.name === value);

    const newArrCategoryState = [...dataCreatePin.topics, response[0].id];

    updateStateTopicPin(newArrCategoryState);

    // const colorBgCategory = await serviceGetColors();

    const newCategory = {
      name: value,
      color: '#000',
    };

    const arrValues = [...categoriesSelect, newCategory];

    if (arrValues) setCategoriesSelect(arrValues);

    setIsFocused(false);
  };

  const handleClickDeleteCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    e.preventDefault();
    const updatedCategoriesSelect = categoriesSelect.filter(
      (elem) => elem.name !== name
    );
    setCategoriesSelect(updatedCategoriesSelect);

    const categoryDeleteState = categoriesPin.filter(
      (elem) => elem.name === name
    );

    const deleteCategory = dataCreatePin.topics.filter(
      (elem: string) => elem !== categoryDeleteState[0].id
    );

    updateStateTopicPin(deleteCategory);
  };

  return (
    <div ref={modalRef} className='flex flex-col gap-2 relative'>
      <InputLabelStyled
        value={dataCreatePin.topicValue}
        register={register}
        textLabel='Etiqueta de categoria'
        infoName='category'
        type='text'
        onFocus={handleFocus}
        readOnly={!imagePreview}
        className={`${
          !imagePreview &&
          'opacity-75 bg-transparent border-gray-300 outline-none outline-transparent cursor-default'
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
