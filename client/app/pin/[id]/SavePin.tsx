import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import ButtonStyled from '../../interfaces/components/Basic/ButtonStyled';

const SavePin = () => {
  const { postSavePin, pinData } = useAppsStore();

  const handleClick = () => {
    console.log(pinData.id);
    postSavePin(pinData.id);
  };

  return (
    <ButtonStyled
      className='bg-redPinterestBg text-white font-semibold py-3 hover:bg-red-800 '
      handleClick={handleClick}
    >
      Guardar
    </ButtonStyled>
  );
};

export default SavePin;
