import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';

const DeactiveAccount = () => {
  return (
    <div className='flex flex-row items-center mt-3'>
      <div>
        <span className='text-sm font-semibold'>Desactivar cuenta</span>
        <p className='text-sm '>
          Oculta temporalmente tu perfil, Pines y tableros
        </p>
      </div>
      <ButtonStyled
        disabled={false}
        className='bg-buttonGreyBg py-3 font-semibold hover:bg-gray-300 dark:text-black'
      >
        Desactivar cuenta
      </ButtonStyled>
    </div>
  );
};

export default DeactiveAccount;
