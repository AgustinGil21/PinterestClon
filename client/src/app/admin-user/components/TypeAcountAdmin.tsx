import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';

const TypeAcountAdmin = () => {
  return (
    <div className='flex flex-row items-center mt-4 justify-between'>
      <div>
        <span className='text-sm font-semibold'>
          Convertir a una cuenta para empresa
        </span>
        <p className='text-[12px] max-w-[270px]'>
          Con una cuenta para empresa, tendrás acceso a herramientas como
          anuncios y analytics para hacer crecer tu negocio en Pinterest.
        </p>
      </div>
      <ButtonStyled
        disabled={false}
        className='bg-buttonGreyBg font-semibold hover:bg-gray-300 dark:text-black'
      >
        Convertir cuenta
      </ButtonStyled>
    </div>
  );
};

export default TypeAcountAdmin;
