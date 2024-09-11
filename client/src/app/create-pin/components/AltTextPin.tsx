import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormGetValues,
} from 'react-hook-form';
import { useEffect } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface AltTextPinInterface {
  imagePreview: string | null;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const AltTextPin = ({
  imagePreview,
  errors,
  register,
  watch,
  getValues,
}: AltTextPinInterface) => {
  const isReadOnly = !imagePreview;
  const { dataCreatePin, updateStateCreatePin } = useAppsStore();
  const altTextRef = watch('altText');

  useEffect(() => {
    if (altTextRef && dataCreatePin?.altText !== altTextRef) {
      updateStateCreatePin('altText', altTextRef);
    }
  }, [altTextRef, getValues, updateStateCreatePin]);

  return (
    <InputLabelStyled
      value={dataCreatePin.altText}
      infoName='altText'
      textLabel='Texto Alt'
      type='text'
      readOnly={isReadOnly}
      register={register}
      errors={errors.altText}
      className={`${
        isReadOnly
          ? 'opacity-75 bg-transparent border-gray-300  outline-none outline-transparent cursor-default'
          : ''
      }`}
    />
  );
};

export default AltTextPin;
