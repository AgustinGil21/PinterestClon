'use client';
import PasswordLose from './PasswordLose';
import ButtonGoogleSession from '../BothModals/ButtonGoogleSession';
import { loginSchema } from '@/app/schemas/validation-form';
import InputRegLog from '../BothModals/InputRegLog';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';
import useFormHook from '@/app/hooks/useFormHook';
import { useAppsStore } from '@/app/stores/useAppStore';
import ButtonStyled from '@/app/components/Basic/ButtonStyled';

const FormLogin = () => {
  const { register, trigger, errors, getValues, isValid } =
    useFormHook(loginSchema);

  const { validateSequentially } = useValidateSequentially(trigger);

  const {
    updateStateRegisterUser,
    email,
    password,
    postDataLoginUser,
    closeLoginModal,
  } = useAppsStore();

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    await validateSequentially();
    if (isValid) {
      const values = getValues();
      updateStateRegisterUser('email', values.email);
      updateStateRegisterUser('email', values.password);

      postDataLoginUser({
        emailAddress: email,
        password: password,
      });

      closeLoginModal();
    }
  };

  return (
    <form className='w-full max-w-[220px] flex flex-col  items-center'>
      <InputRegLog
        register={register}
        errors={errors.email}
        type='email'
        textLabel='Correo electronico'
        infoName='email'
      />
      <InputRegLog
        register={register}
        errors={errors.password}
        type='password'
        textLabel='Contraseña'
        infoName='password'
      />
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
