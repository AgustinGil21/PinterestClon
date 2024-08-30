import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import EyePasswordStyled from '@/app/interfaces/components/Basic/EyePasswordStyled';
import { useState } from 'react';
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';

interface OldPasswordInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const OldPassword = ({ errors, register }: OldPasswordInterface) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  return (
    <div className='relative w-full'>
      <InputLabelStyled
        textLabel='Vieja contraseña'
        type={showOldPassword ? 'text' : 'password'}
        infoName='oldPassword'
        className='w-full'
        errors={errors.oldPassword}
        register={register}
      />

      <EyePasswordStyled
        classname='left-[346px] top-[61px]'
        togglePasswordVisibility={toggleOldPasswordVisibility}
        showPassword={showOldPassword}
      />
    </div>
  );
};

export default OldPassword;
