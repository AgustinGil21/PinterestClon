import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useEffect } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface AltTextPinInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const AltTextPin = ({
  errors,
  register,
  watch,
  getValues,
  setValue,
}: AltTextPinInterface) => {
  const { dataCreatePin, updateStateCreatePin, imagePreview } = useAppsStore();
  const isReadOnly = !imagePreview;

  const altTextRef = watch('alt_text');

  useEffect(() => {
    if (dataCreatePin?.alt_text) {
      setValue('alt_text', dataCreatePin.alt_text);
    }
  }, [dataCreatePin, setValue]);

  useEffect(() => {
    if (altTextRef !== undefined && dataCreatePin?.alt_text !== altTextRef) {
      updateStateCreatePin('alt_text', altTextRef);
    }
  }, [altTextRef, getValues, updateStateCreatePin]);

  return (
    <InputLabelStyled
      value={dataCreatePin.alt_text}
      infoName='alt_text'
      textLabel='Texto Alt'
      type='text'
      readOnly={isReadOnly}
      register={register}
      errors={errors.alt_text}
      className={`${
        isReadOnly
          ? 'opacity-75 bg-transparent border-gray-300  outline-none outline-transparent cursor-default'
          : ''
      }`}
    />
  );
};

export default AltTextPin;
