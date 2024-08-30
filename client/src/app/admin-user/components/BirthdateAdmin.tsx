import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

interface BirthdateAdminInterface {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const BirthdateAdmin = ({
  register,
  watch,
  getValues,
  setValue,
}: BirthdateAdminInterface) => {
  const { userAccountManagment, updateValuesUserAccountManagment } =
    useAppsStore();
  const ref = watch('date');

  useEffect(() => {
    if (userAccountManagment?.birthdate) {
      setValue('date', userAccountManagment.birthdate);
    }
  }, [userAccountManagment?.birthdate, setValue]);

  useEffect(() => {
    const currentValue = getValues('date');
    if (currentValue !== userAccountManagment?.birthdate) {
      updateValuesUserAccountManagment(currentValue, 'birthdate');
    }
  }, [
    ref,
    getValues,
    userAccountManagment?.birthdate,
    updateValuesUserAccountManagment,
  ]);

  return (
    <div className='mt-5'>
      <span className='px-1.5 font-semibold'>Información personal</span>
      <InputLabelStyled
        textLabel='Fecha de nacimiento'
        type='date'
        infoName='date'
        register={register}
      />
    </div>
  );
};

export default BirthdateAdmin;
