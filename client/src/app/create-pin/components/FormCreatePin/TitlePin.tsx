import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useEffect } from 'react';
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';

interface TitlePinInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const TitlePin = ({ register, errors, watch }: TitlePinInterface) => {
  const { dataCreatePin, updateStateCreatePin, imagePreview } = useAppsStore();
  const isReadOnly = !imagePreview;
  const titleRef = watch('title');

  useEffect(() => {
    if (titleRef !== undefined && dataCreatePin.title !== titleRef) {
      updateStateCreatePin('title', titleRef);
    }
  }, [titleRef, updateStateCreatePin]);

  return (
    <InputLabelStyled
      value={dataCreatePin.title}
      register={register}
      errors={errors.title}
      type='text'
      infoName='title'
      textLabel='Título'
      id='title'
      placeHolder='Agregar un título'
      readOnly={isReadOnly}
      className={` w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm  ${
        isReadOnly
          ? 'opacity-75 bg-transparent   outline-none outline-transparent cursor-default'
          : ''
      }`}
    />
  );
};

export default TitlePin;
