import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

interface useBirthdateAdminInterface {
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const useBirthdateAdmin = ({
  watch,
  setValue,
  getValues,
}: useBirthdateAdminInterface) => {
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
};

export default useBirthdateAdmin;
