import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import {
  UseFormSetValue,
  FieldValues,
  UseFormWatch,
  UseFormGetValues,
} from 'react-hook-form';

interface useUrlWebInterface {
  getValue: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const useUrlWebEdit = ({ watch, setValue, getValue }: useUrlWebInterface) => {
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
};

export default useUrlWebEdit;
