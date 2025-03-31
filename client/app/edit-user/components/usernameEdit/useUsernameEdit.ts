import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import {
  FieldValues,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';

interface useUsernameEditInterface {
  setValue: UseFormSetValue<FieldValues>;
  getValue: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const useUsernameEdit = ({
  watch,
  setValue,
  getValue,
}: useUsernameEditInterface) => {
  const { userSettingsEditProfile, updateValuesUserSettingsEditProfile } =
    useAppsStore();

  const refUsername = watch('username');

  useEffect(() => {
    if (userSettingsEditProfile?.username) {
      setValue('username', userSettingsEditProfile?.username);
    }
  }, [userSettingsEditProfile?.username, setValue]);

  useEffect(() => {
    const currentValueUsername = getValue('username');

    if (currentValueUsername !== userSettingsEditProfile?.username) {
      updateValuesUserSettingsEditProfile(currentValueUsername, 'username');
    }
  }, [
    refUsername,
    getValue,
    userSettingsEditProfile?.username,
    updateValuesUserSettingsEditProfile,
  ]);
  return {
    userSettingsEditProfile,
  };
};

export default useUsernameEdit;
