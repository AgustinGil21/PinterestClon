import ButtonGoogleSession from '../../BothModals/ButtonGoogleSession';
import InputLabelStyled from '../../../../../components/Basic/InputLabelStyled';
import ButtonStyled from '../../../../../components/Basic/ButtonStyled';
import EyePasswordStyled from '../../../../../components/Basic/EyePasswordStyled';
import ErrorStyled from '../../../../../components/Basic/ErrorStyled';
import useFormRegister from './useFormRegister';
import { useAppsStore } from '../../../../../../infrastructure/stores/useAppStore';

const FormRegister = () => {
  const {
    register,
    errors,
    serverError,
    showPassword,
    handleClick,
    togglePasswordVisibility,
  } = useFormRegister();
  const { t } = useAppsStore();

  return (
    <form className='w-full max-w-[220px] flex flex-col items-center'>
      <div className='flex flex-col gap-2 '>
        <InputLabelStyled
          register={register}
          errors={errors.email}
          type='email'
          placeHolder={
            t?.auth.register['page-session'].email_address.placeholder ||
            'Email'
          }
          textLabel={
            t?.auth.register['page-session'].email_address.label ||
            'Correo electrónico'
          }
          infoName='email'
          className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        />
        {serverError && <ErrorStyled>{serverError}</ErrorStyled>}
        <div className='w-full mt-2 relative'>
          <InputLabelStyled
            placeHolder={
              t?.auth.register['page-session'].password.placeholder ||
              'Contraseña'
            }
            register={register}
            errors={errors.password}
            type={showPassword ? 'text' : 'password'}
            textLabel={
              t?.auth.register['page-session'].password.label || 'Contraseña'
            }
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
          textLabel={
            t?.auth.register['page-session'].birthdate || 'Fecha de nacimiento'
          }
          infoName='date'
          className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        />
      </div>

      <ButtonStyled
        handleClick={handleClick}
        className='bg-redPinterestBg w-full text-sm mt-2 hover:bg-red-800 text-white'
        disabled={false}
      >
        {t?.auth.register['page-session'].button || 'Continuar'}
      </ButtonStyled>
      <span className='text-black my-0.5 text-[12px] text-center dark:text-white'>
        {t?.auth.register['page-session'].or || 'o'}
      </span>
      {/* <ButtonGoogleSession /> */}
    </form>
  );
};

export default FormRegister;
