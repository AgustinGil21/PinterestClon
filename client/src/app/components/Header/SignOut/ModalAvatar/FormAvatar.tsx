import React from 'react';
import ButtonStyled from '@/app/components/Basic/ButtonStyled';
import InputRegLog from '../BothModals/InputRegLog';
import { useAppsStore } from '@/app/stores/useAppStore';
import useFormHook from '@/app/hooks/useFormHook';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';
import { UsernameSchema } from '@/app/schemas/validation-form';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { serviceGetColors } from '@/app/services/service-register';

const FormAvatar = () => {
  const {
    email,
    password,
    birthdate,
    lang,
    username,
    gender,
    country,
    avatarBackgroundColor,
    avatarLetter,
    avatarTextColor,
  } = useAppsStore();

  const { register, trigger, errors, isValid, handleSubmit } =
    useFormHook(UsernameSchema);
  const { validateSequentially } = useValidateSequentially(trigger);

  const closeAvatarModal = useAppsStore((state) => state.closeAvatarModal);
  const updateStateRegisterUser = useAppsStore(
    (state) => state.updateStateRegisterUser
  );
  const postDataRegisterUser = useAppsStore(
    (state) => state.postDataRegisterUser
  );

  const handleClick: SubmitHandler<FieldValues> = async (data) => {
    await validateSequentially();
    const resultColor = await serviceGetColors();
    updateStateRegisterUser('username', data.username);
    updateStateRegisterUser('avatarBackgroundColor', resultColor.hex);
    updateStateRegisterUser('avatarTextColor', resultColor.letter);

    if (isValid) {
      postDataRegisterUser({
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

      closeAvatarModal();
    }
  };

  return (
    <form>
      <InputRegLog
        type='text'
        textLabel='Nombre de usuario'
        errors={errors.username}
        register={register}
        infoName='username'
      />
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
