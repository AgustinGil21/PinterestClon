import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';

interface Props {
  userID: string;
}

export const BoardItsNotYours = ({ userID }: Props) => {
  const { t } = useAppsStore();

  return (
    <div className='dark:text-white flex flex-col gap-1.5'>
      <span className='text-[13px] px-2'>
        {t?.user['profile-options'].text || 'Opciones de perfil'}
      </span>
      <div className='flex flex-col items-start'>
        <ButtonStyled className='text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-900 w-full text-start rounded-lg'>
          {t?.user['profile-options'].block || 'Bloquear'}
        </ButtonStyled>
        <ButtonStyled className='text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-900 w-full text-start rounded-lg'>
          {t?.user['profile-options'].report || 'Reportar'}
        </ButtonStyled>
      </div>
    </div>
  );
};
