import ButtonGoogleSession from '../BothModals/ButtonGoogleSession';
import ButtonContinue from './ButtonContinue';
import { registerSchema } from '@/app/schemas/validation-form';
import InputRegLog from '../BothModals/InputRegLog';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';
import useFormHook from '@/app/hooks/useFormHook';

const FormRegister = () => {
  const { register, trigger, errors, isValid } = useFormHook(registerSchema);
  const { validateSequentially } = useValidateSequentially(trigger);

  return (
    <form className='w-full max-w-[220px] flex flex-col items-center'>
      <InputRegLog
        register={register}
        errors={errors.email}
        type='email'
        textLabel='Correo electrónico'
        infoName='email'
      />
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
