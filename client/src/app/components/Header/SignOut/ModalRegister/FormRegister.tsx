import ButtonGoogleSession from '../BothModals/ButtonGoogleSession';
import ButtonContinue from './ButtonContinue';
import { useForm } from 'react-hook-form';
import { registerSchema } from '@/app/schemas/validation-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputRegLog from '../BothModals/InputRegLog';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';

const FormRegister = () => {
  const {
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { validateSequentially } = useValidateSequentially(trigger);

  return (
    <form className='w-full max-w-[220px] flex flex-col items-center'>
      <InputRegLog
        register={register}
        errors={errors.email}
        type='email'
        textLabel='Correo electrónico'
      />
      <InputRegLog
        register={register}
        errors={errors.password}
        type='password'
        textLabel='Contraseña'
      />
      <InputRegLog
        register={register}
        errors={errors.date}
        type='date'
        textLabel='Fecha de nacimiento'
      />

      <ButtonContinue
        validateSequentially={validateSequentially}
        isValid={isValid}
      />
      <span className='text-black my-0.5 text-[16px] dark:text-white'>o</span>
      <ButtonGoogleSession />
    </form>
  );
};

export default FormRegister;
