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
  const { userDatEditAccount, updateValues } = useAppsStore();
  const ref = watch('date');

  useEffect(() => {
    if (userDatEditAccount?.birthdate) {
      setValue('date', userDatEditAccount.birthdate);
    }
  }, [userDatEditAccount?.birthdate, setValue]);

  useEffect(() => {
    const currentValue = getValues('date');
    if (currentValue !== userDatEditAccount?.birthdate) {
      updateValues(currentValue, 'birthdate');
    }
  }, [ref, getValues, userDatEditAccount?.birthdate, updateValues]);

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
