import ButtonStyled from '../../Basic/ButtonStyled';
import RegisterModal from './ModalRegister/RegisterModal';
import { useAppsStore } from '@/app/stores/useAppStore';
import GenderModal from './ModalGender/GenderModal';
import NationalityModal from './ModalNationality/NationalityModal';
import AvatarModal from './ModalAvatar/AvatarModal';

const StartRegister = () => {
  const openRegisterModal = useAppsStore((state) => state.openRegisterModal);
  const isNationalityModalOpen = useAppsStore(
    (state) => state.isNationalityModalOpen
  );
  const isGenderModalOpen = useAppsStore((state) => state.isGenderModalOpen);
  const isRegisterModalOpen = useAppsStore(
    (state) => state.isRegisterModalOpen
  );
  const isAvatarModalOpen = useAppsStore((state) => state.isAvatarModalOpen);
  return (
    <div>
      <ButtonStyled
        className={'bg-redPinterestBg text-white  hover:bg-red-700'}
        disabled={true}
        handleClick={openRegisterModal}
      >
        Registrate
      </ButtonStyled>
      {isRegisterModalOpen && <RegisterModal />}
      {isGenderModalOpen && <GenderModal />}
      {isNationalityModalOpen && <NationalityModal />}
      {isAvatarModalOpen && <AvatarModal />}
    </div>
  );
};

export default StartRegister;
