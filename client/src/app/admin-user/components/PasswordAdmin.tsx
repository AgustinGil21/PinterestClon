import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';

const PasswordAdmin = () => {
  return (
    <div className='flex flex-row items-center gap-3 mt-2'>
      <InputLabelStyled
        textLabel='Contraseña'
        infoName='password'
        type='password'
      />
      <ButtonStyled
        disabled={false}
        className='bg-buttonGreyBg font-semibold mt-6 hover:bg-gray-300 dark:text-black'
      >
        Cambiar
      </ButtonStyled>
    </div>
  );
};

export default PasswordAdmin;
