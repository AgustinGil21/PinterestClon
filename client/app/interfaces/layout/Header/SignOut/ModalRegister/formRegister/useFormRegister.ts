import { useState } from 'react';
import useFormHook from '../../../../../hooks/useFormHook';
import { registerSchema } from '../../../../../../infrastructure/schemas/validation-form';
import useValidateSequentially from '../../../../../hooks/useValidateSequentially';
import { useAppsStore } from '../../../../../../infrastructure/stores/useAppStore';
import getFirstLetter from '../../../../../helpers/getFirstLetter';
import { AxiosError } from 'axios';

const useFormRegister = () => {
  const { register, trigger, errors, getValues } = useFormHook({
    schema: registerSchema,
    event: 'onSubmit',
  });
  const { validateSequentially } = useValidateSequentially(trigger);
  const openGenderModal = useAppsStore((state) => state.openGenderModal);
  const postDataEmailUser = useAppsStore((state) => state.postDataEmailUser);
  const updateStateRegisterUser = useAppsStore(
    (state) => state.updateStateRegisterUser
  );

  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setShowPassword((prev) => !prev);
  };

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationPassed = await validateSequentially();
    const currentValues = getValues();

    if (validationPassed) {
      const letter = await getFirstLetter(currentValues.email);
      updateStateRegisterUser('email', currentValues.email);
      updateStateRegisterUser('password', currentValues.password);
      updateStateRegisterUser('birthdate', currentValues.date);
      updateStateRegisterUser('avatarLetter', letter);

      try {
        console.log(currentValues.email);
        await postDataEmailUser({
          emailAddress: currentValues.email,
        });

        openGenderModal();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            setServerError('El correo electrónico ya está registrado.');
          } else {
            setServerError('Ocurrió un error al registrar el usuario.');
          }
        }
      }
    }
  };
  return {
    register,
    errors,
    serverError,
    showPassword,
    handleClick,
    togglePasswordVisibility,
  };
};

export default useFormRegister;
