import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';

interface DescriptionPinInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const DescriptionPin = ({
  register,
  errors,
  watch,
}: DescriptionPinInterface) => {
  const { updateStateCreatePin, dataCreatePin, imagePreview } = useAppsStore();
  const isReadOnly = !imagePreview;
  const descriptionRef = watch('description');

  useEffect(() => {
    if (
      descriptionRef !== undefined &&
      dataCreatePin.description !== descriptionRef
    ) {
      updateStateCreatePin('description', descriptionRef);
    }
  }, [descriptionRef, updateStateCreatePin]);

  return (
    <div>
      <label
        htmlFor='description'
        className={` text-[12px] px-1 dark:text-white ${
          !imagePreview && 'text-gray-300'
        }`}
      >
        Descripción
      </label>
      <textarea
        value={dataCreatePin.description}
        readOnly={isReadOnly}
        className={` w-full rounded-[13px] py-2 px-3 h-[130px] border-gray-300 border-[1px] text-sm outline-outline-search resize-none ${
          isReadOnly
            ? 'opacity-75 bg-transparent border-gray-300  outline-none outline-transparent cursor-default'
            : ''
        }`}
        placeholder='Agregar una descripción detallada'
        id='description'
        {...register('description')}
      ></textarea>
      {errors.description && (
        <ErrorStyled>{errors.description.message as string}</ErrorStyled>
      )}
    </div>
  );
};

export default DescriptionPin;
