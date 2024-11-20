'use client';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import ModalStyled from '../interfaces/components/Basic/ModalStyled';
import InputRegLog from '../interfaces/components/Basic/InputLabelStyled';
import PinterestLogo from '../interfaces/components/icons/PinterestLogo';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { RecoverPasswordSchema } from '../infrastructure/schemas/validation-form';
import useValidateSequentially from '@/app/interfaces/hooks/useValidateSequentially';

const PasswordResetPage = () => {
  const { register, errors, trigger } = useFormHook(RecoverPasswordSchema);
  const { validateSequentially } = useValidateSequentially(trigger);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    validateSequentially();
  };

  return (
    <section className='bg-Feed bg-cover min-h-screen flex justify-center items-center w-full '>
      <div className='absolute inset-0 bg-black opacity-50 z-0'></div>
      <ModalStyled classProps='relative z-50 max-w-[425px] px-6 bg-white py-7 bottom-5 shadow-lg rounded-[30px] flex flex-col items-center  gap-3'>
        <div className='flex flex-col items-center max-w-[340px]'>
          <PinterestLogo classProps='w-10 h-10' />
          <p className='text-2xl font-semibold text-center'>
            Introduce tu nueva contraseña
          </p>
          <p className='text-black text-[13px]  text-center'>
            Escribe una nueva contraseña que puedas recordar y sea segura para
            tu cuenta
          </p>
        </div>
        <form>
          <InputRegLog
            textLabel='Contraseña'
            type='password'
            infoName='password'
            register={register}
            errors={errors.password}
          />
          <InputRegLog
            textLabel='Confirmar Contraseña'
            type='password'
            infoName='password'
            register={register}
            errors={errors.password}
          />
          <ButtonStyled
            className='bg-redPinterestBg w-full text-white mt-8 hover:bg-red-700'
            disabled={false}
            handleClick={handleClick}
          >
            Continuar
          </ButtonStyled>
        </form>
      </ModalStyled>
    </section>
  );
};

export default PasswordResetPage;
