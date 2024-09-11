import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { loginSchema } from '@/app/infrastructure/schemas/validation-form';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { useState } from 'react';
import useValidateSequentially from '@/app/interfaces/hooks/useValidateSequentially';
import { AxiosError } from 'axios';

const useFormLogin = () => {
  const { register, trigger, errors, getValues, isValid } = useFormHook({
    schema: loginSchema,
    event: 'onSubmit',
  });

  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setShowPassword((prev) => !prev);
  };

  const { validateSequentially } = useValidateSequentially(trigger);

  const { updateStateRegisterUser, postDataLoginUser, closeLoginModal } =
    useAppsStore();

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationPassed = await validateSequentially();
    if (validationPassed) {
      const values = getValues();
      updateStateRegisterUser('email', values.email);
      updateStateRegisterUser('password', values.password);

      try {
        await postDataLoginUser({
          emailAddress: values.email,
          password: values.password,
        });

        closeLoginModal();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            setServerError(
              'El email ingresado o la contraseña no está registrada'
            );
          } else {
            setServerError('Ocurrió un error al iniciar sesión.');
          }
        }
      }
    }
  };
  return {
    serverError,
    handleClick,
    register,
    errors,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useFormLogin;
