import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import ButtonStyled from '../../../interfaces/components/Basic/ButtonStyled';
import ModalStyled from '../../../interfaces/components/Basic/ModalStyled';
import useCloseModal from '../../../interfaces/hooks/useCloseModal';

const ModalDeleteAccount = () => {
  const { openDeleteUserAccountModal, deleteUserAccount, postDataLogOut, t } =
    useAppsStore();
  const { modalRef } = useCloseModal({ setModal: openDeleteUserAccountModal });

  const handleClickDelete = async () => {
    postDataLogOut();
    deleteUserAccount();

    window.history.pushState({}, '', '/');
  };

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-2'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <ModalStyled
        classProps='relative z-50 max-w-[425px] px-6 bg-white py-7 bottom-5 shadow-lg rounded-[30px] flex flex-col items-center gap-6'
        modalRef={modalRef}
      >
        <div>
          <h3 className='font-semibold text-2xl text-center'>
            {t?.['account-management']['eliminate-account']['delete-account']
              .modal.title || '¿Estás seguro de que deseas eliminar tu cuenta?'}
          </h3>
          <p className='text-sm text-center mt-3'>
            {t?.['account-management']['eliminate-account']['delete-account']
              .modal.description ||
              'Eliminar tu cuenta es una acción irreversible que eliminará todos tus datos y configuraciones asociados con tu perfil.'}
          </p>
          <div className='flex justify-center mt-8 gap-4 '>
            <ButtonStyled
              handleClick={handleClickDelete}
              className='bg-redPinterestBg text-white font-semibold w-full hover:bg-red-700'
              disabled={false}
            >
              {t?.['account-management']['eliminate-account']['delete-account']
                .modal.confirm || 'Confirmar'}
            </ButtonStyled>
            <ButtonStyled
              handleClick={openDeleteUserAccountModal}
              className='bg-buttonGreyBg font-semibold w-full hover:bg-gray-300 dark:text-black'
              disabled={false}
            >
              {t?.['account-management']['eliminate-account']['delete-account']
                .modal.cancel || 'Cancelar'}
            </ButtonStyled>
          </div>
        </div>
      </ModalStyled>
    </div>
  );
};

export default ModalDeleteAccount;
