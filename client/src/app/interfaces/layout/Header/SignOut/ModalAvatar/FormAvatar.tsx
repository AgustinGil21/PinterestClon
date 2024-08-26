import React, { useState, useEffect } from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import CameraIcon from '@/app/interfaces/components/icons/CameraIcon';
import InputAvatar from './InputAvatar';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import useValidateSequentially from '@/app/interfaces/hooks/useValidateSequentially';
import { UsernameSchema } from '@/app/infrastructure/schemas/validation-form';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { serviceGetColors } from '@/app/infrastructure/services/service-register';
import { AxiosError } from 'axios';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import Image from 'next/image';

const FormAvatar = () => {
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

  return (
    <form className='flex justify-center flex-col items-center'>
      <div className='relative bg-redPinterestBg rounded-full p-5 h-[100px] w-[100px] z-20 cursor-pointer'>
        {imagePreview ? (
          <InputAvatar register={register}>
            <Image
              src={imagePreview}
              alt='Preview'
              layout='fill'
              objectFit='cover'
              className='rounded-full'
            />
          </InputAvatar>
        ) : (
          <InputAvatar register={register}>
            <CameraIcon />
          </InputAvatar>
        )}
      </div>
      <InputLabelStyled
        type='text'
        textLabel='Nombre de usuario'
        errors={errors.username}
        register={register}
        infoName='username'
      />
      {serverError && <ErrorStyled>{serverError}</ErrorStyled>}
      <ButtonStyled
        disabled={!isValid}
        className='w-full text-white bg-redPinterestBg mt-3 hover:bg-red-700'
        handleClick={handleSubmit(handleClick)}
      >
        Finalizar
      </ButtonStyled>
    </form>
  );
};

export default FormAvatar;
