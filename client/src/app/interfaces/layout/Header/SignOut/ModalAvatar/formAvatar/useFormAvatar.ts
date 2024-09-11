import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { UsernameSchema } from '@/app/infrastructure/schemas/validation-form';
import { useState } from 'react';
import useValidateSequentially from '@/app/interfaces/hooks/useValidateSequentially';
import { serviceGetColors } from '@/app/infrastructure/services/service-register';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { AxiosError } from 'axios';

const useFormAvatar = () => {
  const {
    email,
    password,
    birthdate,
    lang,
    gender,
    country,
    avatarLetter,
    updateStateRegisterUser,
    postDataRegisterUser,
    getDataUserLogged,
    closeAvatarModal,
  } = useAppsStore();

  const { register, trigger, errors, isValid, handleSubmit, getValues, watch } =
    useFormHook({
      schema: UsernameSchema,
      event: 'onSubmit',
    });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const avatarFile = watch('avatar');

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [avatarFile]);

  const { validateSequentially } = useValidateSequentially(trigger);
  const [serverError, setServerError] = useState('');

  const handleClick: SubmitHandler<FieldValues> = async (data) => {
    const validationPassed = await validateSequentially();

    if (validationPassed) {
      const currentValues = getValues();

      const resultColor = await serviceGetColors();
      updateStateRegisterUser('username', data.username);
      updateStateRegisterUser('avatarBackgroundColor', resultColor.hex);
      updateStateRegisterUser('avatarTextColor', resultColor.letter);

      const formData = new FormData();

      formData.append('emailAddress', email);
      formData.append('password', password);
      formData.append('username', data.username);
      formData.append('birthdate', birthdate);
      formData.append('genderId', gender);
      formData.append('countryId', country);
      formData.append('langId', lang);
      formData.append('avatarBackground', resultColor.hex);
      formData.append('avatarLetterColor', resultColor.letter);
      formData.append('avatarLetter', avatarLetter);
      formData.append('avatar', currentValues.avatar[0]);

      try {
        await postDataRegisterUser(formData);
        await getDataUserLogged();
        closeAvatarModal();

        window.history.pushState({}, '', '/');
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setServerError('El nombre de usuario ya está en uso');
          } else {
            setServerError('Ocurrió un error al registrar el usuario');
          }
        }
      }
    }
  };
  return {
    register,
    imagePreview,
    errors,
    serverError,
    isValid,
    handleSubmit,
    handleClick,
  };
};

export default useFormAvatar;
