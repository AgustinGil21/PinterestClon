import ButtonStyled from '../../../components/Basic/ButtonStyled';
import LogInModal from './ModalLogin/LogInModal';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const StartLog = () => {
  const { openLoginModal, isLoginModalOpen } = useAppsStore();

  return (
    <>
      <ButtonStyled
        handleClick={openLoginModal}
        className={'bg-buttonGreyBg text-black font-semibold hover:bg-gray-300'}
        disabled={true}
      >
        Iniciar sesion
      </ButtonStyled>
      {isLoginModalOpen && <LogInModal></LogInModal>}
    </>
  );
};

export default StartLog;
