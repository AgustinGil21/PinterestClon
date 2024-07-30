import PasswordLose from './PasswordLose';
import ButtonStartSession from './ButtonStartSession';
import ButtonGoogleSession from '../BothModals/ButtonGoogleSession';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/app/schemas/validation-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputRegLog from '../BothModals/InputRegLog';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';

const FormLogin = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { validateSequentially } = useValidateSequentially(trigger);

  return (
    <form className='w-full max-w-[220px] flex flex-col  items-center'>
      <InputRegLog
        register={register}
        errors={errors.email}
        type='email'
        textLabel='Correo electronico'
      />
      <InputRegLog
        register={register}
        errors={errors.password}
        type='password'
        textLabel='Contraseña'
      />
      <PasswordLose />
      <ButtonStartSession validateSequentially={validateSequentially} />
      <span className='text-black my-0.5 text-[16px] dark:text-white '>o</span>
      <ButtonGoogleSession />
    </form>
  );
};

export default FormLogin;
