import React from 'react';
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
import { useState } from 'react';
import { AxiosError } from 'axios';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';

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

  const { register, trigger, errors, isValid, handleSubmit, getValues } =
    useFormHook({
      schema: UsernameSchema,
      event: 'onSubmit',
    });

  const { validateSequentially } = useValidateSequentially(trigger);
  const [serverError, setServerError] = useState('');

  const handleClick: SubmitHandler<FieldValues> = async (data) => {
    const validationPassed = await validateSequentially();

    if (validationPassed) {
      const currentValues = getValues();
      console.log(currentValues);
      console.log(currentValues.avatar[0]);

      const resultColor = await serviceGetColors();
      updateStateRegisterUser('username', data.username);
      updateStateRegisterUser('avatarBackgroundColor', resultColor.hex);
      updateStateRegisterUser('avatarTextColor', resultColor.letter);

      try {
        await postDataRegisterUser({
          emailAddress: email,
          password: password,
          username: data.username,
          birthdate: birthdate,
          genderId: gender,
          countryId: country,
          langId: lang,
          avatarBackground: resultColor.hex,
          avatarLetterColor: resultColor.letter,
          avatarLetter: avatarLetter,
        });

        // const formData = new FormData();

        // formData.append('file', currentValues.avatar[0]);

        // const response = await postDataAvatarUser(formData);
        // console.log(response);

        await getDataUserLogged();

        closeAvatarModal();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setServerError('El nombre de usuario ya esta en uso');
          } else {
            setServerError('Ocurrió un error al registrar el usuario');
          }
        }
      }
    }
  };

  return (
    <form className='flex justify-center flex-col items-center'>
      <div className=' bg-redPinterestBg rounded-full p-5 h-[100px] w-[100px] z-20 cursor-pointer '>
        <InputAvatar register={register}>
          <CameraIcon />
        </InputAvatar>
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
