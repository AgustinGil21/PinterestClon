import { useState } from 'react';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import EyePasswordStyled from '@/app/interfaces/components/Basic/EyePasswordStyled';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface NewPasswordInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const NewPassword = ({ errors, register }: NewPasswordInterface) => {
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className='relative w-full'>
      <InputLabelStyled
        textLabel='Contraseña nueva'
        type={showNewPassword ? 'text' : 'password'}
        infoName='newPassword'
        className='w-full'
        errors={errors.newPassword}
        register={register}
      />
      <EyePasswordStyled
        classname='left-[346px] top-[55px]'
        togglePasswordVisibility={toggleNewPasswordVisibility}
        showPassword={showNewPassword}
      />
    </div>
  );
};

export default NewPassword;
