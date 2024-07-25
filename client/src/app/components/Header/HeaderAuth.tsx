import ButtonStyled from '../Basic/ButtonStyled';
import ArrowBottomUser from '../icons/ArrowBottomUser';

export const HeaderAuth = () => {
  return (
    <div className='flex flex-row items-center gap-4'>
      <div className='flex gap-2'>
        <ButtonStyled
          className={'bg-buttonGreyBg text-black hover:bg-gray-300'}
          disabled={true}
        >
          Iniciar sesion
        </ButtonStyled>
        <ButtonStyled
          className={'bg-redPinterestBg text-white hover:bg-red-700'}
          disabled={true}
        >
          Registrate
        </ButtonStyled>
      </div>
      <ArrowBottomUser />
    </div>
  );
};

export default HeaderAuth;
