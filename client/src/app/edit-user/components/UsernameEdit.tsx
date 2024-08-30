import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';

interface UsernameEdiInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValue: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const UsernameEdit = ({
  register,
  errors,
  watch,
  getValue,
  setValue,
}: UsernameEdiInterface) => {
  const {
    userSettingsEditProfile,
    updateValuesUserSettingsEditProfile,
    userPublicData,
  } = useAppsStore();

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

  return (
    <div>
      <InputLabelStyled
        type='text'
        infoName='username'
        textLabel='Nombre de usuario'
        register={register}
        errors={errors.username}
      />
      <span className='text-[10px] px-2 text-gray-500'>
        www.pinterest.com/{userSettingsEditProfile?.username}
      </span>
    </div>
  );
};

export default UsernameEdit;
