import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import CameraIcon from '@/app/interfaces/components/icons/CameraIcon';
import InputAvatar from '../InputAvatar';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import Image from 'next/image';
import useFormAvatar from './useFormAvatar';

const FormAvatar = () => {
  const {
    register,
    imagePreview,
    errors,
    serverError,
    isValid,
    handleSubmit,
    handleClick,
  } = useFormAvatar();
  const { t } = useAppsStore();

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
        className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm mt-2'
        textLabel={t?.auth.register['page-avatar'].label || 'Nombre de usuario'}
        errors={errors.username}
        register={register}
        infoName='username'
      />
      {serverError && <ErrorStyled>{serverError}</ErrorStyled>}
      <ButtonStyled
        disabled={!isValid}
        className='w-full text-white bg-redPinterestBg mt-3 hover:bg-red-700 cursor-pointer'
        handleClick={handleSubmit(handleClick)}
      >
        {t?.auth.register['page-avatar'].button || 'Finalizar'}
      </ButtonStyled>
    </form>
  );
};

export default FormAvatar;
