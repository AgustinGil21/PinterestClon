import ButtonStyled from '../../../../interfaces/components/Basic/ButtonStyled';
import ModalStyled from '../../../../interfaces/components/Basic/ModalStyled';
import OldPassword from '../OldPassword';
import NewPassword from '../NewPassword';
import React from 'react';
import useModalChangePassword from './useModalChangePassword';
import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';

const ModalChangePassword = () => {
  const {
    handleClick,
    modalRef,
    errors,
    register,
    passwordError,
    closeChangePasswordModal,
  } = useModalChangePassword();
  const { t } = useAppsStore();

  return (
    <div className='fixed inset-0  flex items-center justify-center  z-[90] p-2'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <ModalStyled
        modalRef={modalRef}
        classProps='relative z-50 max-w-[445px] px-6 bg-white py-5 bottom-5 shadow-lg rounded-[20px] flex flex-col  gap-6'
      >
        <div>
          <form className='flex justify-center flex-col gap-5 text-2xls'>
            <span className='font-semibold text-center text-2xl '>
              {t?.['account-management'].password['change-password-modal']
                .title || 'Establece una contraseña'}
            </span>
            <div className='flex flex-col gap-7 px-6'>
              <OldPassword
                errors={errors}
                register={register}
                passwordError={passwordError}
              />

              <NewPassword errors={errors} register={register} />
            </div>
            <div className='flex justify-end gap-2 mt-5 relative'>
              <ButtonStyled
                disabled={false}
                type='button'
                className='bg-buttonGreyBg font-semibold hover:bg-slate-300 dark:text-black'
                handleClick={closeChangePasswordModal}
              >
                {t?.['account-management'].password['change-password-modal']
                  .cancel || 'Cancelar'}
              </ButtonStyled>
              <ButtonStyled
                handleClick={handleClick}
                disabled={false}
                type='button'
                className='bg-buttonGreyBg font-semibold  hover:bg-slate-300 dark:text-black'
              >
                {t?.['account-management'].password['change-password-modal']
                  .save || 'Guardar'}
              </ButtonStyled>
            </div>
          </form>
        </div>
      </ModalStyled>
    </div>
  );
};

export default ModalChangePassword;
