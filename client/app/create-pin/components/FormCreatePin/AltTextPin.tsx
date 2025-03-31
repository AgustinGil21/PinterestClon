import InputLabelStyled from '../../../interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useEffect } from 'react';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';

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
  const { dataCreatePin, updateStateCreatePin, imagePreview, t } =
    useAppsStore();
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
      textLabel={t?.['create-pin'].form['alt-text'].label || 'Texto Alt'}
      type='text'
      placeHolder={
        t?.['create-pin'].form['alt-text'].placeholder || 'Agregar un texto alt'
      }
      readOnly={isReadOnly}
      register={register}
      errors={errors.alt_text}
      className={` w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm ${
        isReadOnly
          ? 'opacity-75 bg-transparent  outline-none outline-transparent cursor-default '
          : ''
      }`}
    />
  );
};

export default AltTextPin;
