import ModalStyled from '@/app/components/Basic/ModalStyled';
import CameraIcon from '@/app/components/icons/CameraIcon';
import InputAvatar from './InputAvatar';
import FormAvatar from './FormAvatar';

const AvatarModal = () => {
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
          <FormAvatar />
        </div>
      </ModalStyled>
    </div>
  );
};

export default AvatarModal;
