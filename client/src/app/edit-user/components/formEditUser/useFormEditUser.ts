import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { UserSettingsEditProfileValidationSchema } from '@/app/infrastructure/schemas/validation-form';
import { useState } from 'react';

const useFormEditUser = () => {
  const {
    putUserSettingsEditProfile,
    userSettingsEditProfile,
    userPublicData,
    patchAvatar,
  } = useAppsStore();
  const { register, errors, getValues, watch, setValue } = useFormHook({
    schema: UserSettingsEditProfileValidationSchema,
    event: 'onChange',
  });

  const [value] = useState(userSettingsEditProfile);

  const handleClick = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const currentValues = getValues();

    const hasValue = Object.values(currentValues).some(
      (value) => typeof value === 'string' && value.trim().length > 0
    );

    const hasValidFields = Object.keys(currentValues).every((field) => {
      const fieldError = errors[field];
      const fieldValue = currentValues[field];
      return (
        !fieldError ||
        (typeof fieldValue === 'string' && fieldValue.trim().length > 0)
      );
    });

    const hasNoErrors = Object.keys(errors).length === 0;

    if (!hasValue || !hasValidFields || !hasNoErrors) {
      console.log(
        'El formulario tiene errores o no tiene valores válidos para enviar.'
      );
      return;
    }

    if (currentValues.avatar[0]) {
      try {
        await patchAvatar({
          avatar: currentValues.avatar[0],
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (
      userSettingsEditProfile?.name === value?.name &&
      userSettingsEditProfile?.website === value?.website &&
      userSettingsEditProfile?.surname === value?.surname &&
      userSettingsEditProfile?.about_you === value?.about_you &&
      userSettingsEditProfile?.username === value?.username
    )
      return;

    try {
      await putUserSettingsEditProfile({
        username: userSettingsEditProfile?.username,
        name: userSettingsEditProfile?.name,
        surname: userSettingsEditProfile?.surname,
        about_you: userSettingsEditProfile?.about_you,
        website: userSettingsEditProfile?.website,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    register,
    errors,
    handleClick,
    watch,
    getValues,
    setValue,
  };
};

export default useFormEditUser;
