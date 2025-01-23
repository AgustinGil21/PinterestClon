import ButtonStyled from '../../../components/Basic/ButtonStyled';
import LogInModal from './ModalLogin/LogInModal';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const StartLog = () => {
  const { openLoginModal, isLoginModalOpen, t } = useAppsStore();

  return (
    <>
      <ButtonStyled
        handleClick={openLoginModal}
        className={
          'bg-buttonGreyBg text-black font-semibold py-[11px] hover:bg-gray-300'
        }
      >
        {t?.header.buttons.login || 'Iniciar sesión'}
      </ButtonStyled>
      {isLoginModalOpen && <LogInModal></LogInModal>}
    </>
  );
};

export default StartLog;
