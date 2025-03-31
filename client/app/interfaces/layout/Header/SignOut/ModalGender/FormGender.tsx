'use client';
import ButtonStyled from '../../../../components/Basic/ButtonStyled';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useAppsStore } from '../../../../../infrastructure/stores/useAppStore';
import GenderInput from './GenderInput';
import { useEffect } from 'react';

const translations: { [key: string]: string } = {
  male: 'Masculino',
  female: 'Femenino',
  nonbinary: 'No binario',
};

const FormGender = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const {
    closeGenderModal,
    getDataGender,
    genders,
    updateStateRegisterUser,
    t,
  } = useAppsStore();

  useEffect(() => {
    getDataGender();
  }, [getDataGender]);

  const handleClick: SubmitHandler<FieldValues> = (data) => {
    if (isValid) {
      updateStateRegisterUser('gender', data.radio);
      closeGenderModal();
    }
  };

  return (
    <form className='flex flex-col justify-start items-start gap-5 w-full'>
      {genders.map((elem) => (
        <GenderInput
          key={elem.id}
          register={register}
          value={elem.id}
          textLabel={
            t?.['account-management']['personal-info'].gender[`${elem.name}`] ||
            elem.name
          }
          id={elem.id}
        />
      ))}

      <ButtonStyled
        className='bg-redPinterestBg mt-10 text-white w-full hover:bg-red-800'
        disabled={false}
        handleClick={handleSubmit(handleClick)}
      >
        {t?.auth.register['page-gender'].button || 'Siguiente'}
      </ButtonStyled>
    </form>
  );
};

export default FormGender;
