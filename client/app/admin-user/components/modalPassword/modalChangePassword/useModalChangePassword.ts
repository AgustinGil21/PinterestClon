import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';
import useCloseModalModalForLoginAndRegister from '../../../../interfaces/hooks/useCloseModalForLoginAndRegister';
import { ChangePasswordSchema } from '../../../../infrastructure/schemas/validation-form';
import { useState } from 'react';
import useFormHook from '../../../../interfaces/hooks/useFormHook';
import { AxiosError } from 'axios';

const useModalChangePassword = () => {
  const { closeChangePasswordModal, patchPasswordAccountManagement } =
    useAppsStore();
  const { modalRef } = useCloseModalModalForLoginAndRegister({
    setModal: closeChangePasswordModal,
  });
  const { getValues, errors, register, isValid } = useFormHook({
    event: 'all',
    schema: ChangePasswordSchema,
  });

  const [passwordError, setPasswordError] = useState('');

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const currentValues = getValues();

    if (!isValid) return;
    try {
      await patchPasswordAccountManagement({
        prevPassword: currentValues.oldPassword,
        newPassword: currentValues.newPassword,
      });
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        setPasswordError(
          'La contraseña ingresada con coincide con la contraseña actual'
        );
      }
    }
  };

  return {
    handleClick,
    passwordError,
    modalRef,
    errors,
    register,
    closeChangePasswordModal,
  };
};

export default useModalChangePassword;
