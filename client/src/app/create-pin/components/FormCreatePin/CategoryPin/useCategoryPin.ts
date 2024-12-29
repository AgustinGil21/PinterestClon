import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect, useRef, useState } from 'react';
import {
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
  FieldValues,
} from 'react-hook-form';

interface UseCategoryPinInterface {
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const useCategoryPin = ({
  setValue,
  getValues,
  watch,
}: UseCategoryPinInterface) => {
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
    getCategoriesPin();
    if (!imagePreview) {
      setCategoriesSelect([]);
      updateStateTopicPin([]);
      setValue('category', '');
    }
  }, [getCategoriesPin, imagePreview]);

  type p = {
    name?: string;
    color?: string;
  };

  useEffect(() => {
    const selectedCategories = categoriesPin
      .filter((category) => dataCreatePin.topics.includes(category.id))
      .map((category) => ({
        name: category.name || 'Unknown',
        color: '#000',
      }));
    setCategoriesSelect(selectedCategories);
  }, [dataCreatePin.topics, categoriesPin]);

  useEffect(() => {
    const currentValues = getValues('category') || '';
    const response = categoriesPin.filter((elem) =>
      elem.name?.toLowerCase().includes(currentValues.toLowerCase())
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

  return {
    handleClickDeleteCategory,
    handleClick,
    handleFocus,
    filterCategories,
    isFocused,
    modalRef,
    imagePreview,
    categoriesSelect,
  };
};

export default useCategoryPin;
