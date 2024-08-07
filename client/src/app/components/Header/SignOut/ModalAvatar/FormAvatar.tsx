import React from 'react';
import ButtonStyled from '@/app/components/Basic/ButtonStyled';
import CameraIcon from '@/app/components/icons/CameraIcon';
import InputAvatar from './InputAvatar';
import InputRegLog from '../BothModals/InputRegLog';
import { useAppsStore } from '@/app/stores/useAppStore';
import useFormHook from '@/app/hooks/useFormHook';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';
import { UsernameSchema } from '@/app/schemas/validation-form';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { serviceGetColors } from '@/app/services/service-register';

const FormAvatar = () => {
  const { email, password, birthdate, lang, gender, country, avatarLetter } =
    useAppsStore();

  const { register, trigger, errors, isValid, handleSubmit, getValues } =
    useFormHook(UsernameSchema);
  const { validateSequentially } = useValidateSequentially(trigger);

  const closeAvatarModal = useAppsStore((state) => state.closeAvatarModal);
  const updateStateRegisterUser = useAppsStore(
    (state) => state.updateStateRegisterUser
  );
  const postDataRegisterUser = useAppsStore(
    (state) => state.postDataRegisterUser
  );
  const postDataAvatarUser = useAppsStore((state) => state.postDataAvatarUser);
  const getDataUserLogged = useAppsStore((state) => state.getDataUserLogged);

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

      // const result = getValues();
      // console.log(result);

      const response = await getDataUserLogged();
      console.log(response);

      closeAvatarModal();
    }
  };

  return (
    <form className='flex justify-center flex-col items-center'>
      <div className=' bg-redPinterestBg rounded-full p-5 h-[100px] w-[100px] z-20 cursor-pointer '>
        <InputAvatar>
          <CameraIcon />
        </InputAvatar>
      </div>
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
