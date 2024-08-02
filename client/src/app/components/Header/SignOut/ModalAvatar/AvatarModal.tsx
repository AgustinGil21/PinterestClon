import InputRegLog from '../BothModals/InputRegLog';
import ModalStyled from '@/app/components/Basic/ModalStyled';
import { UsernameSchema } from '@/app/schemas/validation-form';
import ButtonStyled from '@/app/components/Basic/ButtonStyled';
import useValidateSequentially from '@/app/hooks/useValidateSequentially';
import CameraIcon from '@/app/components/icons/CameraIcon';
import InputAvatar from './InputAvatar';
import { useAppsStore } from '@/app/stores/useAppStore';
import useFormHook from '@/app/hooks/useFormHook';

const AvatarModal = () => {
  const { register, trigger, errors, isValid } = useFormHook(UsernameSchema);

  const getDataUser = useAppsStore((state) => state.getDataUser);
  const closeAvatarModal = useAppsStore((state) => state.closeAvatarModal);

  const { validateSequentially } = useValidateSequentially(trigger);
  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    await validateSequentially();
    if (isValid) {
      closeAvatarModal();
      getDataUser();
    }
  };

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <ModalStyled classProps='relative z-50 max-w-[425px] px-6 bg-white py-7 bottom-5 shadow-lg rounded-[30px] flex flex-col items-center gap-6'>
        <div className='flex flex-col items-center '>
          <p className='text-center text-2xl text-black font-bold m-2 dark:text-white'>
            Foto Avatar
          </p>
          <div className=' bg-redPinterestBg rounded-full p-5 h-[100px] w-[100px] z-20 cursor-pointer '>
            <InputAvatar>
              <CameraIcon />
            </InputAvatar>
          </div>
        </div>
        <form>
          <InputRegLog
            type='text'
            textLabel='Nombre de usuario'
            errors={errors.username}
            register={register}
            infoName='username'
          />
          <ButtonStyled
            disabled={false}
            className='w-full text-white bg-redPinterestBg mt-3 hover:bg-red-700'
            handleClick={handleClick}
          >
            Finalizar
          </ButtonStyled>
        </form>
      </ModalStyled>
    </div>
  );
};

export default AvatarModal;
