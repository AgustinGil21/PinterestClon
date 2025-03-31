import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import {
  UseFormWatch,
  UseFormSetValue,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form';

interface useTextareaInterface {
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const useTextAreaEdit = ({
  watch,
  setValue,
  getValues,
}: useTextareaInterface) => {
  const { updateValuesUserSettingsEditProfile, userSettingsEditProfile } =
    useAppsStore();
  const refContent = watch('about_you');

  useEffect(() => {
    if (userSettingsEditProfile?.about_you) {
      setValue('about_you', userSettingsEditProfile?.about_you);
    }
  }, [userSettingsEditProfile?.about_you, setValue]);

  useEffect(() => {
    const currentValueContent = getValues('about_you');

    if (currentValueContent !== userSettingsEditProfile?.about_you) {
      updateValuesUserSettingsEditProfile(currentValueContent, 'about_you');
    }
  }, [
    refContent,
    getValues,
    userSettingsEditProfile?.about_you,
    updateValuesUserSettingsEditProfile,
  ]);
  return {
    userSettingsEditProfile,
  };
};

export default useTextAreaEdit;
