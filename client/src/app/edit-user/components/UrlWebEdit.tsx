import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

interface UrlWebInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  getValue: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const UrlWebEdit = ({
  register,
  errors,
  getValue,
  setValue,
  watch,
}: UrlWebInterface) => {
  const { updateValuesUserSettingsEditProfile, userSettingsEditProfile } =
    useAppsStore();
  const refUrl = watch('website');

  useEffect(() => {
    if (userSettingsEditProfile?.website) {
      setValue('website', userSettingsEditProfile?.website);
    }
  }, [userSettingsEditProfile?.website]);

  useEffect(() => {
    const currentValueUrl = getValue('website');

    if (userSettingsEditProfile?.website !== currentValueUrl) {
      updateValuesUserSettingsEditProfile(currentValueUrl, 'website');
    }
  }, [refUrl]);

  return (
    <div>
      <InputLabelStyled
        type='text'
        infoName='website'
        textLabel='Sitio web'
        register={register}
        errors={errors.website}
      />
      <p className='text-[10px] px-2 mt-2 text-gray-500'>
        Agrega tu web o sitio de contacto para que las personas puedan conocerte
        mejor y seguir tus actualizaciones. Compartir tu presencia en línea
        permitirá que otros aprendan más sobre ti
      </p>
    </div>
  );
};

export default UrlWebEdit;
