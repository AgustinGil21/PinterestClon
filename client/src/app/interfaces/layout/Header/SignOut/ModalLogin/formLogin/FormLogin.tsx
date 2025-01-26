'use client';
import PasswordLose from '../PasswordLose';
import ButtonGoogleSession from '../../BothModals/ButtonGoogleSession';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import EyePasswordStyled from '@/app/interfaces/components/Basic/EyePasswordStyled';
import useFormLogin from './useFormLogin';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const FormLogin = () => {
  const {
    serverError,
    handleClick,
    register,
    errors,
    showPassword,
    togglePasswordVisibility,
  } = useFormLogin();
  const { t } = useAppsStore();

  return (
    <form
      className='w-full max-w-[220px] flex flex-col  items-center'
      onSubmit={handleClick}
    >
      {serverError && <ErrorStyled>{serverError}</ErrorStyled>}
      <div className='relative w-full'>
        <InputLabelStyled
          register={register}
          errors={errors.email}
          type='email'
          textLabel={t?.auth.login.email_address.label || 'Correo electrónico'}
          infoName='email'
          placeHolder={t?.auth.login.email_address.placeholder || 'Email'}
          className='w-full  rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm  '
        />
      </div>

      <div className='relative w-full mt-2'>
        <InputLabelStyled
          register={register}
          errors={errors.password}
          type={showPassword ? 'text' : 'password'}
          textLabel={t?.auth.login.password.label || 'Contraseña'}
          infoName='password'
          placeHolder={t?.auth.login.password.label || 'Contraseña'}
          className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        />
        <EyePasswordStyled
          classname='left-[216px] top-[54px]'
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </div>

      <PasswordLose />

      <ButtonStyled
        handleClick={handleClick}
        disabled={false}
        className='bg-redPinterestBg text-white w-full py-1 text-[11px] mt-2 rounded-[23px] hover:bg-red-700'
        type='submit'
      >
        {t?.auth.login.button || 'Iniciar Sesión'}
      </ButtonStyled>

      {/* <span className='text-black my-0.5 text-[16px] dark:text-white'>o</span>
      <ButtonGoogleSession /> */}
    </form>
  );
};

export default FormLogin;
