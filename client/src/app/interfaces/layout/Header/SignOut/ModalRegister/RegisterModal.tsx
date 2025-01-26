import ModalStyled from '@/app/interfaces/components/Basic/ModalStyled';
import TextLogo from '../BothModals/TextLogo';
import CloseX from '../BothModals/CloseX';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import FormRegister from './formRegister/FormRegister';
import InfoModalLogin from '../BothModals/InfoModal';
import ButtonInverse from '../BothModals/ButtonInverse';
import useCloseModalModalForLoginAndRegister from '@/app/interfaces/hooks/useCloseModalForLoginAndRegister';

export const RegisterModal = () => {
  const closeBothModal = useAppsStore((state) => state.closeBothModal);
  const openLoginModal = useAppsStore((state) => state.openLoginModal);
  const { t } = useAppsStore();
  const { modalRef } = useCloseModalModalForLoginAndRegister({
    setModal: closeBothModal,
  });

  return (
    <div className='fixed inset-0 flex items-center justify-center z-[200] p-2'>
      <div className='absolute inset-0 bg-black opacity-50 '></div>
      <ModalStyled
        modalRef={modalRef}
        classProps='relative  max-w-[395px] px-6  bg-white py-7 bottom-5 shadow-lg rounded-[30px] flex flex-col items-center '
      >
        <CloseX />
        <TextLogo>
          {t?.auth.register['page-session'].title ||
            'Acceso gratuito e ilimitado a las mejores ideas del mundo'}
        </TextLogo>
        <p className='text-black text-[13px] mt-[-9px] mb-2 dark:text-white'>
          {t?.auth.register['page-session'].subtitle ||
            'Regístrate para ver más'}
        </p>
        <FormRegister />
        <InfoModalLogin />
        <ButtonInverse openModal={openLoginModal}>
          {' '}
          {t?.auth.register['page-session']['go-to-login'] ||
            'Ya eres miembro? Iniciar sesión'}
        </ButtonInverse>
      </ModalStyled>
    </div>
  );
};

export default RegisterModal;
