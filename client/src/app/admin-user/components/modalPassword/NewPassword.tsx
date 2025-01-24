import { useState } from 'react';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import EyePasswordStyled from '@/app/interfaces/components/Basic/EyePasswordStyled';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface NewPasswordInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const NewPassword = ({ errors, register }: NewPasswordInterface) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { t } = useAppsStore();

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className='relative w-full'>
      <InputLabelStyled
        textLabel={
          t?.['account-management'].password['change-password-modal'][
            'new-password'
          ] || 'Contraseña nueva'
        }
        type={showNewPassword ? 'text' : 'password'}
        infoName='newPassword'
        placeHolder={
          t?.['account-management'].password['change-password-modal'][
            'new-password'
          ] || 'Contraseña nueva'
        }
        className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        errors={errors.newPassword}
        register={register}
      />
      <EyePasswordStyled
        classname='left-[346px] top-[60px]'
        togglePasswordVisibility={toggleNewPasswordVisibility}
        showPassword={showNewPassword}
      />
    </div>
  );
};

export default NewPassword;
