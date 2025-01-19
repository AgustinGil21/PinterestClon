import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ModalDeleteAccount from './modalDeleteProfile/ModalDeleteAccount';

const DeleteAccount = () => {
  const { isDeleteUserAccountModalOpen, openDeleteUserAccountModal } =
    useAppsStore();

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    openDeleteUserAccountModal();
  };

  return (
    <div className='flex mt-3 flex-col md:flex-row items-start md:items-center gap-4'>
      <div>
        <span className='text-sm  font-semibold'>
          Eliminar tus datos y tu cuenta
        </span>
        <p className='text-sm'>
          Elimina permanentemente tus datos y todo lo asociado a tu cuenta
        </p>
      </div>
      <ButtonStyled
        handleClick={handleClick}
        className='py-2.5 bg-redPinterestBg text-white font-semibold hover:bg-red-700 '
        disabled={false}
      >
        Eliminar cuenta
      </ButtonStyled>
      {isDeleteUserAccountModalOpen && <ModalDeleteAccount />}
    </div>
  );
};

export default DeleteAccount;
