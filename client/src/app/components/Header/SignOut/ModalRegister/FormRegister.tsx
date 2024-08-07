import ButtonGoogleSession from '../BothModals/ButtonGoogleSession';
import { registerSchema } from '@/app/schemas/validation-form';
import InputRegLog from '../BothModals/InputRegLog';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';
import useFormHook from '@/app/hooks/useFormHook';
import { useAppsStore } from '@/app/stores/useAppStore';
import getFirstLetter from '@/app/helpers/getFirstLetter';
import ButtonStyled from '@/app/components/Basic/ButtonStyled';
import { AxiosError } from 'axios';
import { useState } from 'react';
import ErrorStyled from '@/app/components/Basic/ErrorStyled';

const FormRegister = () => {
  const { register, trigger, errors, isValid, getValues } =
    useFormHook(registerSchema);
  const { validateSequentially } = useValidateSequentially(trigger);
  const openGenderModal = useAppsStore((state) => state.openGenderModal);
  const postDataEmailUser = useAppsStore((state) => state.postDataEmailUser);
  const updateStateRegisterUser = useAppsStore(
    (state) => state.updateStateRegisterUser
  );
  const getDataUserLogged = useAppsStore((state) => state.getDataUserLogged);
  const [serverError, setServerError] = useState('');

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    await validateSequentially();
    const currentValues = getValues();
    const letter = await getFirstLetter(currentValues.email);

    if (isValid) {
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
    <form className='w-full max-w-[220px] flex flex-col items-start'>
      <InputRegLog
        register={register}
        errors={errors.email}
        type='email'
        textLabel='Correo electrónico'
        infoName='email'
      />
      {serverError && (
        <div>
          {' '}
          <ErrorStyled>{serverError}</ErrorStyled>
        </div>
      )}
      <InputRegLog
        register={register}
        errors={errors.password}
        type='password'
        textLabel='Contraseña'
        infoName='password'
      />
      <InputRegLog
        register={register}
        errors={errors.date}
        type='date'
        textLabel='Fecha de nacimiento'
        infoName='date'
      />

      <ButtonStyled
        handleClick={handleClick}
        className='bg-redPinterestBg w-full  text-sm mt-2 hover:bg-red-800 '
        disabled={false}
      >
        Continuar
      </ButtonStyled>
      <span className='text-black my-0.5 text-[16px] dark:text-white'>o</span>
      <ButtonGoogleSession />
    </form>
  );
};

export default FormRegister;
