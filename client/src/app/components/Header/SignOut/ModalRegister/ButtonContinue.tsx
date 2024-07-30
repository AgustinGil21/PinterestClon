import ButtonStyled from '@/app/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/stores/useAppStore';

interface ButtonContinueInterface {
  isValid: boolean;
  validateSequentially: () => Promise<boolean | undefined>;
}

const ButtonContinue = ({
  isValid,
  validateSequentially,
}: ButtonContinueInterface) => {
  const openGenderModal = useAppsStore((state) => state.openGenderModal);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    validateSequentially();
    console.log(isValid);
    if (isValid) {
      openGenderModal();
    }
  };

  return (
    <>
      <ButtonStyled
        className='bg-redPinterestBg w-full  text-sm mt-2 hover:bg-red-800 '
        disabled={false}
        handleClick={handleClick}
      >
        Continuar
      </ButtonStyled>
    </>
  );
};

export default ButtonContinue;
