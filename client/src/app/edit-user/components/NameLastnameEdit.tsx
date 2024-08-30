import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';

interface NameLastnameInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const NameLastnameEdit = ({
  register,
  errors,
  getValues,
  watch,
  setValue,
}: NameLastnameInterface) => {
  const { userSettingsEditProfile, updateValuesUserSettingsEditProfile } =
    useAppsStore();

  const refName = watch('name');
  const refSurname = watch('surname');

  useEffect(() => {
    if (userSettingsEditProfile?.name) {
      setValue('name', userSettingsEditProfile?.name);
    }

    if (userSettingsEditProfile?.surname) {
      setValue('surname', userSettingsEditProfile?.surname);
    }
  }, [
    userSettingsEditProfile?.surname,
    userSettingsEditProfile?.name,
    setValue,
  ]);

  useEffect(() => {
    const currentValueName = getValues('name');

    if (currentValueName !== userSettingsEditProfile?.name) {
      updateValuesUserSettingsEditProfile(currentValueName, 'name');
    }

    const currentValueSurname = getValues('surname');

    if (currentValueSurname !== userSettingsEditProfile?.surname) {
      updateValuesUserSettingsEditProfile(currentValueSurname, 'surname');
    }
  }, [
    refName,
    refSurname,
    getValues,
    updateValuesUserSettingsEditProfile,
    userSettingsEditProfile?.name,
    userSettingsEditProfile?.surname,
  ]);

  return (
    <div className='flex flex-row gap-3 mt-3'>
      <InputLabelStyled
        textLabel='Nombre(s)'
        infoName='name'
        type='text'
        register={register}
        errors={errors.name}
        value={userSettingsEditProfile?.name}
      />
      <InputLabelStyled
        textLabel='Apellido(s)'
        infoName='surname'
        type='text'
        register={register}
        errors={errors.lastname}
        value={userSettingsEditProfile?.surname}
      />
    </div>
  );
};

export default NameLastnameEdit;
