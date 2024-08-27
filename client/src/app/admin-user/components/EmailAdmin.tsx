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

interface EmailAdminInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const EmailAdmin = ({
  register,
  errors,
  getValues,
  watch,
  setValue,
}: EmailAdminInterface) => {
  const { userAccountManagment, updateValues } = useAppsStore();
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
      updateValues(currentValue, 'email_address');
    }
  }, [emailRef, getValues, userAccountManagment?.email_address, updateValues]);

  return (
    <div>
      <span className='px-1.5 font-semibold'>Tu cuenta</span>
      <InputLabelStyled
        register={register}
        textLabel='Correo electrónico • Privado'
        infoName='email'
        type='email'
        errors={errors.email}
      />
    </div>
  );
};

export default EmailAdmin;
