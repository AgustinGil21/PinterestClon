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
  const { userPublicData, updateValuesExtraInfoUser } = useAppsStore();

  const refName = watch('name');
  const refSurname = watch('surname');

  useEffect(() => {
    if (userPublicData?.name) {
      setValue('name', userPublicData?.name);
    }

    if (userPublicData?.surname) {
      setValue('surname', userPublicData?.surname);
    }
  }, [userPublicData?.surname, userPublicData?.name, setValue]);

  useEffect(() => {
    const currentValueName = getValues('name');

    if (currentValueName !== userPublicData?.name) {
      updateValuesExtraInfoUser(currentValueName, 'name');
    }

    const currentValueSurname = getValues('surname');

    if (currentValueSurname !== userPublicData?.surname) {
      updateValuesExtraInfoUser(currentValueSurname, 'surname');
    }
  }, [
    refName,
    refSurname,
    getValues,
    updateValuesExtraInfoUser,
    userPublicData?.name,
    userPublicData?.surname,
  ]);

  return (
    <div className='flex flex-row gap-3 mt-3'>
      <InputLabelStyled
        textLabel='Nombre(s)'
        infoName='name'
        type='text'
        register={register}
        errors={errors.name}
        value={userPublicData?.name}
      />
      <InputLabelStyled
        textLabel='Apellidos'
        infoName='surname'
        type='text'
        register={register}
        errors={errors.lastname}
        value={userPublicData?.surname}
      />
    </div>
  );
};

export default NameLastnameEdit;
