'use client';
import PasswordLose from './PasswordLose';
import ButtonGoogleSession from '../BothModals/ButtonGoogleSession';
import { loginSchema } from '@/app/infrastructure/schemas/validation-form';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import useValidateSequentially from '@/app/interfaces/hooks/useValidateSequentially';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { AxiosError } from 'axios';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import { useState } from 'react';

const FormLogin = () => {
  const { register, trigger, errors, getValues, isValid } = useFormHook({
    schema: loginSchema,
    event: 'onSubmit',
  });

  const [serverError, setServerError] = useState('');
  const { validateSequentially } = useValidateSequentially(trigger);

  const {
    updateStateRegisterUser,
    postDataLoginUser,
    closeLoginModal,
    getDataUserLogged,
  } = useAppsStore();

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationPassed = await validateSequentially();
    if (validationPassed) {
      const values = getValues();
      updateStateRegisterUser('email', values.email);
      updateStateRegisterUser('password', values.password);

      try {
        await postDataLoginUser({
          emailAddress: values.email,
          password: values.password,
        });

        closeLoginModal();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            setServerError(
              'El email ingresado o la contraseña no esta registrada'
            );
          } else {
            setServerError('Ocurrió un error al iniciar sesión.');
          }
        }
      }
    }
  };

  return (
    <form className='w-full max-w-[220px] flex flex-col  items-center'>
      {serverError && <ErrorStyled>{serverError}</ErrorStyled>}
      <div>
        <InputLabelStyled
          register={register}
          errors={errors.email}
          type='email'
          textLabel='Correo electronico'
          infoName='email'
        />

        <InputLabelStyled
          register={register}
          errors={errors.password}
          type='password'
          textLabel='Contraseña'
          infoName='password'
        />
      </div>
      <PasswordLose />
      <ButtonStyled
        handleClick={handleClick}
        disabled={false}
        className={
          'bg-redPinterestBg w-full py-1 text-[11px] mt-2 rounded-[23px] hover:bg-red-700'
        }
      >
        Iniciar Sesion
      </ButtonStyled>
      <span className='text-black my-0.5 text-[16px] dark:text-white '>o</span>
      <ButtonGoogleSession />
    </form>
  );
};

export default FormLogin;
