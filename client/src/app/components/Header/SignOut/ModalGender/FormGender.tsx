import ButtonStyled from '@/app/components/Basic/ButtonStyled';
import { useForm } from 'react-hook-form';
import { useAppsStore } from '@/app/stores/useAppStore';
import GenderInput from './GenderInput';

const FormGender = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const closeGenderModal = useAppsStore((state) => state.closeGenderModal);
  const handleClick = () => {
    if (isValid) {
      closeGenderModal();
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className='flex flex-col justify-start items-start gap-5 w-full'
    >
      <GenderInput register={register} value='Female' textLabel='Mujer' />
      <GenderInput register={register} value='Male' textLabel='Hombre' />
      <GenderInput
        register={register}
        value='Other'
        textLabel='No binario'
        defaultChecked
      />
      <ButtonStyled
        className='bg-redPinterestBg mt-10 text-white w-full hover:bg-red-800'
        disabled={false}
        handleClick={handleClick}
      >
        Siguiente
      </ButtonStyled>
    </form>
  );
};

export default FormGender;
