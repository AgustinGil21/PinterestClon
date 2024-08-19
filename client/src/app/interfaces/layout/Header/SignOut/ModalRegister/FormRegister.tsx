import ButtonGoogleSession from '../BothModals/ButtonGoogleSession';
import { registerSchema } from '@/app/infrastructure/schemas/validation-form';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import useValidateSequentially from '@/app/interfaces/hooks/useValidateSequentially';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import getFirstLetter from '@/app/interfaces/helpers/getFirstLetter';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { AxiosError } from 'axios';
import { useState } from 'react';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';

const FormRegister = () => {
  const { register, trigger, errors, getValues } = useFormHook({
    schema: registerSchema,
    event: 'onSubmit',
  });
  const { validateSequentially } = useValidateSequentially(trigger);
  const openGenderModal = useAppsStore((state) => state.openGenderModal);
  const postDataEmailUser = useAppsStore((state) => state.postDataEmailUser);
  const updateStateRegisterUser = useAppsStore(
    (state) => state.updateStateRegisterUser
  );

  const [serverError, setServerError] = useState('');

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationPassed = await validateSequentially();
    const currentValues = getValues();

    if (validationPassed) {
      const letter = await getFirstLetter(currentValues.email);
      updateStateRegisterUser('email', currentValues.email);
      updateStateRegisterUser('password', currentValues.password);
      updateStateRegisterUser('birthdate', currentValues.date);
      updateStateRegisterUser('avatarLetter', letter);

      try {
        console.log(currentValues.email);
        await postDataEmailUser({
          emailAddress: currentValues.email,
        });

        openGenderModal();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            setServerError('El correo electrónico ya está registrado.');
          } else {
            setServerError('Ocurrió un error al registrar el usuario.');
          }
        }
      }
    }
  };

  return (
    <form className='w-full max-w-[220px] flex flex-col items-center'>
      <div className='flex flex-col '>
        <InputLabelStyled
          register={register}
          errors={errors.email}
          type='email'
          textLabel='Correo electrónico'
          infoName='email'
        />
        {serverError && <ErrorStyled>{serverError}</ErrorStyled>}
        <InputLabelStyled
          register={register}
          errors={errors.password}
          type='password'
          textLabel='Contraseña'
          infoName='password'
        />
        <InputLabelStyled
          min='1940-01-01'
          max='2008-01-01'
          register={register}
          errors={errors.date}
          type='date'
          textLabel='Fecha de nacimiento'
          infoName='date'
        />
      </div>

      <ButtonStyled
        handleClick={handleClick}
        className='bg-redPinterestBg w-full  text-sm mt-2 hover:bg-red-800 '
        disabled={false}
      >
        Continuar
      </ButtonStyled>
      <span className='text-black my-0.5 text-[16px] text-center dark:text-white'>
        o
      </span>
      <ButtonGoogleSession />
    </form>
  );
};

export default FormRegister;
