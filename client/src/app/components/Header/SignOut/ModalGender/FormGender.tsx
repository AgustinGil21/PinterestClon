'use client';
import ButtonStyled from '@/app/components/Basic/ButtonStyled';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useAppsStore } from '@/app/stores/useAppStore';
import GenderInput from './GenderInput';
import { useEffect } from 'react';

const FormGender = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const closeGenderModal = useAppsStore((state) => state.closeGenderModal);
  const getGenders = useAppsStore((state) => state.getDataGender);
  const Genders = useAppsStore((state) => state.genders);
  const updateStateRegisterUser = useAppsStore(
    (state) => state.updateStateRegisterUser
  );

  useEffect(() => {
    getGenders();
  }, [getGenders]);

  const handleClick: SubmitHandler<FieldValues> = (data) => {
    if (isValid) {
      updateStateRegisterUser('gender', data.radio);
      closeGenderModal();
    }
  };

  return (
    <form className='flex flex-col justify-start items-start gap-5 w-full'>
      {Genders.map((elem) => (
        <GenderInput
          key={elem.id}
          register={register}
          value={elem.id}
          textLabel={elem.name}
          id={elem.id}
        />
      ))}

      <ButtonStyled
        className='bg-redPinterestBg mt-10 text-white w-full hover:bg-red-800'
        disabled={false}
        handleClick={handleSubmit(handleClick)}
      >
        Siguiente
      </ButtonStyled>
    </form>
  );
};

export default FormGender;
