import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';

const Message = () => {
  const { t } = useAppsStore();

  return (
    <ButtonStyled className='bg-buttonGreyBg rounded-full font-semibold py-3 text-[12px]  px-4 hover:bg-gray-300 w-[50%]'>
      {t?.user.buttons.message || 'Mensaje'}
    </ButtonStyled>
  );
};

export default Message;
