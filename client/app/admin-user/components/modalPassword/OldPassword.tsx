import InputLabelStyled from '../../../interfaces/components/Basic/InputLabelStyled';
import EyePasswordStyled from '../../../interfaces/components/Basic/EyePasswordStyled';
import { useState } from 'react';
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';
import ErrorStyled from '../../../interfaces/components/Basic/ErrorStyled';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';

interface OldPasswordInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  passwordError: string;
}

const OldPassword = ({
  errors,
  register,
  passwordError,
}: OldPasswordInterface) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const { t } = useAppsStore();

  return (
    <>
      <div className='w-full relative'>
        <InputLabelStyled
          textLabel={
            t?.['account-management'].password['change-password-modal'][
              'current-password'
            ] || 'Contraseña actual'
          }
          type={showOldPassword ? 'text' : 'password'}
          infoName='oldPassword'
          placeHolder={
            t?.['account-management'].password['change-password-modal'][
              'current-password'
            ] || 'Contraseña actual'
          }
          className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
          errors={errors.oldPassword}
          register={register}
        />

        <EyePasswordStyled
          classname='left-[346px] top-[60px]'
          togglePasswordVisibility={toggleOldPasswordVisibility}
          showPassword={showOldPassword}
        />
        {passwordError && <ErrorStyled>{passwordError}</ErrorStyled>}
      </div>
    </>
  );
};

export default OldPassword;
