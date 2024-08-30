import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ModalStyled from '@/app/interfaces/components/Basic/ModalStyled';
import OldPassword from './OldPassword';
import NewPassword from './NewPassword';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { ChangePasswordSchema } from '@/app/infrastructure/schemas/validation-form';
import useCloseModalModalForLoginAndRegister from '@/app/interfaces/hooks/useCloseModalForLoginAndRegister';
import React from 'react';

const ModalChangePassword = () => {
  const { closeChangePasswordModal, patchPasswordAccountManagement } =
    useAppsStore();
  const { modalRef } = useCloseModalModalForLoginAndRegister({
    setModal: closeChangePasswordModal,
  });
  const { getValues, errors, register, isValid } = useFormHook({
    event: 'all',
    schema: ChangePasswordSchema,
  });

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const currentValues = getValues();
    console.log(currentValues);

    if (!isValid) {
      console.log('invalido');
      return;
    }

    try {
      patchPasswordAccountManagement({
        prevPassword: currentValues.oldPassword,
        newPassword: currentValues.newPassword,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <ModalStyled
        modalRef={modalRef}
        classProps='relative z-50 max-w-[445px] px-6 bg-white py-5 bottom-5 shadow-lg rounded-[20px] flex flex-col  gap-6'
      >
        <div>
          <form className='flex justify-center flex-col gap-5 text-2xls'>
            <span className='font-semibold text-center text-2xl '>
              Establece una contraseña
            </span>
            <div className='flex flex-col gap-7 px-6'>
              <OldPassword errors={errors} register={register} />
              <NewPassword errors={errors} register={register} />
            </div>
            <div className='flex justify-end gap-2 mt-5 relative'>
              <ButtonStyled
                disabled={false}
                type='button'
                className='bg-buttonGreyBg font-semibold hover:bg-slate-300 dark:text-black'
                handleClick={closeChangePasswordModal}
              >
                Cancelar
              </ButtonStyled>
              <ButtonStyled
                handleClick={handleClick}
                disabled={false}
                type='submit'
                className='bg-buttonGreyBg font-semibold  hover:bg-slate-300 dark:text-black'
              >
                Guardar
              </ButtonStyled>
            </div>
          </form>
        </div>
      </ModalStyled>
    </div>
  );
};

export default ModalChangePassword;
