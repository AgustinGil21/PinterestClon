import ButtonStyled from '../../../components/Basic/ButtonStyled';
import RegisterModal from './ModalRegister/RegisterModal';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import GenderModal from './ModalGender/GenderModal';
import NationalityModal from './ModalNationality/NationalityModal';
import AvatarModal from './ModalAvatar/AvatarModal';

const StartRegister = () => {
  const {
    openRegisterModal,
    isRegisterModalOpen,
    isGenderModalOpen,
    isNationalityModalOpen,
    isAvatarModalOpen,
    t,
  } = useAppsStore();

  return (
    <div>
      <ButtonStyled
        className={
          'bg-redPinterestBg text-white font-semibold  hover:bg-red-700 py-[11px]'
        }
        handleClick={openRegisterModal}
      >
        {t?.header.buttons.register || 'Registrate'}
      </ButtonStyled>
      {isRegisterModalOpen && <RegisterModal />}
      {isGenderModalOpen && <GenderModal />}
      {isNationalityModalOpen && <NationalityModal />}
      {isAvatarModalOpen && <AvatarModal />}
    </div>
  );
};

export default StartRegister;
