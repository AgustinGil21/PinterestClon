import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useEffect } from 'react';
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';

interface ImagePreviewInterface {
  imagePreview: string | null;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const UrlPin = ({
  imagePreview,
  register,
  errors,
  watch,
}: ImagePreviewInterface) => {
  const isReadOnly = !imagePreview;
  const { updateStateCreatePin, dataCreatePin } = useAppsStore();
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
