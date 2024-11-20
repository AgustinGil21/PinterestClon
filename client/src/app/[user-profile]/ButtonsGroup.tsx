import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import Link from 'next/link';

interface ButtonGroupInterface {
  isShareAccountOpen: boolean;
  openShareAccountModal: () => void;
}

const ButtonsGroup = ({
  isShareAccountOpen,
  openShareAccountModal,
}: ButtonGroupInterface) => {
  return (
    <div className='mt-4 flex gap-2 flex-row'>
      <ButtonStyled
        type='button'
        className={`font-semibold py-[12px]  ${
          isShareAccountOpen
            ? 'bg-black text-white'
            : 'bg-buttonGreyBg text-black hover:bg-gray-300'
        }`}
        handleClick={openShareAccountModal}
      >
        Compartir
      </ButtonStyled>

      <Link href={'/edit-user'}>
        <ButtonStyled
          type='button'
          className='bg-buttonGreyBg font-semibold py-[12px] hover:bg-gray-300'
        >
          Editar perfil
        </ButtonStyled>
      </Link>
    </div>
  );
};

export default ButtonsGroup;
