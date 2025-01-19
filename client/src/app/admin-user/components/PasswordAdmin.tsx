import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ModalChangePassword from './modalPassword/modalChangePassword/ModalChangePassword';

const PasswordAdmin = () => {
  const { isChangePasswordModalOpen, openChangePasswordModalOpen } =
    useAppsStore();

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    openChangePasswordModalOpen();
  };

  return (
    <>
      <div className='flex flex-col items-start md:items-center  md:gap-6 mt-3 w-full  md:flex-row'>
        <div className=''>
          <span className='font-semibold text-sm'>Contraseña</span>
          <p className='text-[12px]  '>
            Cambiar la contraseña en Pinterest implica actualizar la clave que
            utilizas para acceder a tu cuenta.
          </p>
        </div>
        <ButtonStyled
          handleClick={handleClick}
          disabled={false}
          className='bg-buttonGreyBg font-semibold mt-6 hover:bg-gray-300 dark:text-black'
        >
          Cambiar contraseña
        </ButtonStyled>
      </div>
      {isChangePasswordModalOpen && <ModalChangePassword />}
    </>
  );
};

export default PasswordAdmin;
