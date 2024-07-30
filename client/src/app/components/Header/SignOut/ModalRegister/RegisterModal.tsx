import ModalStyled from '@/app/components/Basic/ModalStyled';
import TextLogo from '../BothModals/TextLogo';
import CloseX from '../BothModals/CloseX';
import useCloseModal from '@/app/hooks/useCloseModal';
import { useAppsStore } from '@/app/stores/useAppStore';
import FormRegister from './FormRegister';
import InfoModalLogin from '../BothModals/InfoModal';
import ButtonInverse from '../BothModals/ButtonInverse';

export const RegisterModal = () => {
  const closeBothModal = useAppsStore((state) => state.closeBothModal);
  const openLoginModal = useAppsStore((state) => state.openLoginModal);
  const { modalRef } = useCloseModal({ closeBothModal });
  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <ModalStyled
        modalRef={modalRef}
        classProps='relative z-50 max-w-[395px] px-6  bg-white py-7 bottom-5 shadow-lg rounded-[30px] flex flex-col items-center'
      >
        <CloseX />
        <TextLogo>
          Acceso gratuito e ilimitado a las mejores ideas del mundo
        </TextLogo>
        <p className='text-black text-[13px] mt-[-9px] mb-2 dark:text-white'>
          Regístrate para ver más
        </p>
        <FormRegister />
        <InfoModalLogin />
        <ButtonInverse openModal={openLoginModal}>
          {' '}
          Ya eres miembro? Iniciar sesión{' '}
        </ButtonInverse>
      </ModalStyled>
    </div>
  );
};

export default RegisterModal;
