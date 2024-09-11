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
  imagePreview: string | null;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const TitlePin = ({
  imagePreview,
  register,
  errors,
  watch,
}: TitlePinInterface) => {
  const { dataCreatePin, updateStateCreatePin } = useAppsStore();
  const isReadOnly = !imagePreview;
  const titleRef = watch('title');

  useEffect(() => {
    if (titleRef && dataCreatePin.title !== titleRef) {
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
      readOnly={isReadOnly}
      className={`${
        isReadOnly
          ? 'opacity-75 bg-transparent border-gray-300  outline-none outline-transparent cursor-default'
          : ''
      }`}
    />
  );
};

export default TitlePin;
