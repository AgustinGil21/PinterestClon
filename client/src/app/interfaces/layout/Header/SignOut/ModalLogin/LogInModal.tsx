import ModalStyled from '../../../../components/Basic/ModalStyled';
import TextLogo from '../BothModals/TextLogo';
import CloseX from '../BothModals/CloseX';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import FormLogin from './formLogin/FormLogin';
import ButtonInverse from '../BothModals/ButtonInverse';
import InfoModalLogin from '../BothModals/InfoModal';
import useCloseModalModalForLoginAndRegister from '@/app/interfaces/hooks/useCloseModalForLoginAndRegister';

export const LogInModal = () => {
  const { openRegisterModal, closeBothModal, t } = useAppsStore();

  const { modalRef } = useCloseModalModalForLoginAndRegister({
    setModal: closeBothModal,
  });

  return (
    <div className='fixed inset-0  flex items-center justify-center z-[200] p-2'>
      <div className='absolute inset-0 bg-black opacity-50 '></div>
      <ModalStyled
        modalRef={modalRef}
        classProps='relative z-50 max-w-[395px]  px-6 bg-white py-7 bottom-5 shadow-lg rounded-[30px] flex flex-col items-center'
      >
        <CloseX />
        <TextLogo>
          {t?.auth.login.title || 'Inicia sesión para ver más'}
        </TextLogo>
        <FormLogin />
        <InfoModalLogin />
        <ButtonInverse openModal={openRegisterModal}>
          {t?.auth.login['go-to-register'] ||
            '¿Aún no estás en Pinterest? Regístrate'}
        </ButtonInverse>
      </ModalStyled>
    </div>
  );
};

export default LogInModal;
