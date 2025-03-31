import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import {
  UseFormGetValues,
  FieldValues,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';

interface useEmailAdminInterface {
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const useEmailAdmin = ({
  watch,
  getValues,
  setValue,
}: useEmailAdminInterface) => {
  const { userAccountManagment, updateValuesUserAccountManagment } =
    useAppsStore();
  const emailRef = watch('email');

  useEffect(() => {
    if (
      userAccountManagment?.email_address &&
      getValues('email') !== userAccountManagment.email_address
    ) {
      setValue('email', userAccountManagment.email_address);
    }
  }, [setValue, userAccountManagment?.email_address, getValues]);

  useEffect(() => {
    const currentValue = getValues('email');
    if (currentValue && userAccountManagment?.email_address !== currentValue) {
      updateValuesUserAccountManagment(currentValue, 'email_address');
    }
  }, [
    emailRef,
    getValues,
    userAccountManagment?.email_address,
    updateValuesUserAccountManagment,
  ]);
};

export default useEmailAdmin;
