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

const UrlPin = ({ register, errors, watch }: ImagePreviewInterface) => {
  const { updateStateCreatePin, dataCreatePin, imagePreview, t } =
    useAppsStore();
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
      textLabel={t?.['create-pin'].form.link.label || 'Enlace'}
      placeHolder={
        t?.['create-pin'].form.link.placeholder || 'Agrega un enlace'
      }
      className={` w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm  ${
        isReadOnly
          ? 'opacity-75 bg-transparent   outline-none outline-transparent cursor-default   '
          : ''
      }`}
    />
  );
};

export default UrlPin;
