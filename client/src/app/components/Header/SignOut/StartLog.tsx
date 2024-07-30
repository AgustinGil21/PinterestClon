import ButtonStyled from '../../Basic/ButtonStyled';
import LogInModal from './ModalLogin/LogInModal';
import { useAppsStore } from '@/app/stores/useAppStore';

const StartLog = () => {
  const openLoginModal = useAppsStore((state) => state.openLoginModal);
  const isLoginModalOpen = useAppsStore((state) => state.isLoginModalOpen);

  return (
    <>
      <ButtonStyled
        handleClick={openLoginModal}
        className={'bg-buttonGreyBg text-black hover:bg-gray-300'}
        disabled={true}
      >
        Iniciar sesion
      </ButtonStyled>
      {isLoginModalOpen && <LogInModal></LogInModal>}
    </>
  );
};

export default StartLog;
