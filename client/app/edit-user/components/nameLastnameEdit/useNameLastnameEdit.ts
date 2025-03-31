import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import {
  UseFormGetValues,
  FieldValues,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';

interface useNameLastnameInterface {
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const useNameLastnameEdit = ({
  watch,
  setValue,
  getValues,
}: useNameLastnameInterface) => {
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

  return {
    userSettingsEditProfile,
  };
};

export default useNameLastnameEdit;
