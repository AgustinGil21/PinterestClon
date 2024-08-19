import ModalStyled from '../../../../components/Basic/ModalStyled';
import TextLogo from '../BothModals/TextLogo';
import CloseX from '../BothModals/CloseX';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import FormLogin from './FormLogin';
import ButtonInverse from '../BothModals/ButtonInverse';
import InfoModalLogin from '../BothModals/InfoModal';

export const LogInModal = () => {
  const closeBothModal = useAppsStore((state) => state.closeBothModal);
  const openRegisterModal = useAppsStore((state) => state.openRegisterModal);

  const { modalRef } = useCloseModal({ setModal: closeBothModal });

  return (
    <div className='fixed inset-0  flex items-center justify-center z-[200]'>
      <div className='absolute inset-0 bg-black opacity-50 '></div>
      <ModalStyled
        modalRef={modalRef}
        classProps='relative z-50 max-w-[395px]  px-6 bg-white py-7 bottom-5 shadow-lg rounded-[30px] flex flex-col items-center'
      >
        <CloseX />
        <TextLogo>Inicia sesión para ver más</TextLogo>
        <FormLogin />
        <InfoModalLogin />
        <ButtonInverse openModal={openRegisterModal}>
          ¿Aún no estás en Pinterest? Regístrate
        </ButtonInverse>
      </ModalStyled>
    </div>
  );
};

export default LogInModal;
