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
  const { userPublicData, updateValuesExtraInfoUser } = useAppsStore();

  const refUsername = watch('username');
  useEffect(() => {
    setValue('username', userPublicData?.username);
  }, []);

  useEffect(() => {
    if (userPublicData?.username) {
      setValue('username', userPublicData.username);
    }
  }, [userPublicData?.username]);

  useEffect(() => {
    const currentValueUsername = getValue('username');

    if (currentValueUsername !== userPublicData?.username) {
      updateValuesExtraInfoUser(currentValueUsername, 'username');
    }
  }, [refUsername]);

  return (
    <div>
      <InputLabelStyled
        type='text'
        infoName='username'
        textLabel='Nombre de usuario'
        register={register}
        errors={errors.username}
        value={userPublicData?.username}
      />
      <span className='text-[10px] px-2 text-gray-500'>
        www.pinterest.com/{userPublicData?.username}
      </span>
    </div>
  );
};

export default UsernameEdit;
