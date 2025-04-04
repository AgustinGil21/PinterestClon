import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import InputStyled from '../../interfaces/components/Basic/InputStyled';

const AuthTwoFactors = () => {
  const { t } = useAppsStore();

  return (
    <>
      <div>
        <span className='text-1xl font-semibold'>
          {t?.security['two-factor-authentication'].title ||
            'Autenticación de dos factores'}
        </span>
        <p className='text-[13px] max-w-[440px]'>
          {t?.security['two-factor-authentication'].description ||
            'Esto hará que tu cuenta sea aún más segura. Junto con la contraseña, deberás ingresar el código secreto que enviaremos por mensaje de texto a tu teléfono cada vez que inicies sesión.'}
        </p>
        <div className='flex flex-row items-center gap-2 mt-5'>
          <InputStyled
            type='checkbox'
            infoName='auth'
            classProps=' flex gap-8 w-[20px] custom-checkbox '
          />
          <label htmlFor='' className='text-[14px]'>
            {t?.security['two-factor-authentication']['require-code'] ||
              'Solicitar código al iniciar sesión'}
          </label>
        </div>
      </div>
    </>
  );
};

export default AuthTwoFactors;
