import ButtonGoogleSession from '../../BothModals/ButtonGoogleSession';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import EyePasswordStyled from '@/app/interfaces/components/Basic/EyePasswordStyled';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import useFormRegister from './useFormRegister';

const FormRegister = () => {
  const {
    register,
    errors,
    serverError,
    showPassword,
    handleClick,
    togglePasswordVisibility,
  } = useFormRegister();

  return (
    <form className='w-full max-w-[220px] flex flex-col items-center'>
      <div className='flex flex-col gap-2 '>
        <InputLabelStyled
          register={register}
          errors={errors.email}
          type='email'
          placeHolder='Email'
          textLabel='Correo electrónico'
          infoName='email'
          className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        />
        {serverError && <ErrorStyled>{serverError}</ErrorStyled>}
        <div className='w-full mt-2 relative'>
          <InputLabelStyled
            placeHolder='Contraseña'
            register={register}
            errors={errors.password}
            type={showPassword ? 'text' : 'password'}
            textLabel='Contraseña'
            infoName='password'
            className=' w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
          />

          <EyePasswordStyled
            classname='left-[216px]  top-[54px]'
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
        <InputLabelStyled
          min='1930-01-01'
          max='2014-01-01'
          register={register}
          errors={errors.date}
          type='date'
          textLabel='Fecha de nacimiento'
          infoName='date'
          className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        />
      </div>

      <ButtonStyled
        handleClick={handleClick}
        className='bg-redPinterestBg w-full text-sm mt-2 hover:bg-red-800 text-white'
        disabled={false}
      >
        Continuar
      </ButtonStyled>
      <span className='text-black my-0.5 text-[16px] text-center dark:text-white'>
        o
      </span>
      {/* <ButtonGoogleSession /> */}
    </form>
  );
};

export default FormRegister;
