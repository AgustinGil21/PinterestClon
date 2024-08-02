'use client';
import PasswordLose from './PasswordLose';
import ButtonStartSession from './ButtonStartSession';
import ButtonGoogleSession from '../BothModals/ButtonGoogleSession';
import { loginSchema } from '@/app/schemas/validation-form';
import InputRegLog from '../BothModals/InputRegLog';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';
import useFormHook from '@/app/hooks/useFormHook';

const FormLogin = () => {
  const { register, trigger, errors } = useFormHook(loginSchema);

  const { validateSequentially } = useValidateSequentially(trigger);

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
      <ButtonStartSession validateSequentially={validateSequentially} />
      <span className='text-black my-0.5 text-[16px] dark:text-white '>o</span>
      <ButtonGoogleSession />
    </form>
  );
};

export default FormLogin;
