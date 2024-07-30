import ButtonStyled from '../../../Basic/ButtonStyled';

interface validateSequentiallyInterface {
  validateSequentially: () => Promise<boolean | undefined>;
}

const ButtonStartSession = ({
  validateSequentially,
}: validateSequentiallyInterface) => {
  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    validateSequentially();
  };

  return (
    <ButtonStyled
      handleClick={handleClick}
      className={
        'bg-redPinterestBg w-full py-1 text-[11px] mt-2 rounded-[23px]  hover:bg-red-700'
      }
      disabled={false}
    >
      Iniciar sesión
    </ButtonStyled>
  );
};

export default ButtonStartSession;
