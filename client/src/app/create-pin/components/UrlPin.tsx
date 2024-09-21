import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useEffect } from 'react';
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';

interface ImagePreviewInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const UrlPin = ({
  register,
  errors,
  watch,
  setValue,
}: ImagePreviewInterface) => {
  const { updateStateCreatePin, dataCreatePin, imagePreview } = useAppsStore();
  const isReadOnly = !imagePreview;

  const urlRef = watch('url');

  useEffect(() => {
    if (urlRef !== undefined && dataCreatePin.url !== urlRef) {
      updateStateCreatePin('url', urlRef);
    }
  }, [urlRef, updateStateCreatePin]);

  return (
    <InputLabelStyled
      value={dataCreatePin.url}
      register={register}
      errors={errors.url}
      type='text'
      readOnly={isReadOnly}
      infoName='url'
      textLabel='Enlace'
      className={`${
        isReadOnly
          ? 'opacity-75 bg-transparent border-gray-300  outline-none outline-transparent cursor-default '
          : ''
      }`}
    />
  );
};

export default UrlPin;
