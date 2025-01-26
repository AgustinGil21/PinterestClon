import ModalStyled from '@/app/interfaces/components/Basic/ModalStyled';
import SelectCountry from './SelectCountry';
import SelectLanguage from './SelectLanguage';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ButtonReverse from './ButtonReverse';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const NationalityModal = () => {
  const openAvatarModal = useAppsStore((state) => state.openAvatarModal);
  const { t } = useAppsStore();
  const handleClick = () => {
    openAvatarModal();
  };

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <ModalStyled classProps='relative z-50 max-w-[425px] px-6 bg-white py-7 bottom-5 shadow-lg rounded-[30px] flex flex-col items-center'>
        <div className='text-black text-center max-w-[380px] dark:text-white flex flex-col'>
          <ButtonReverse />
          <h3 className='font-bold text-2xl'>
            {t?.auth.register['page-lang'].title ||
              '¿Cuál es tu idioma y donde vives?'}
          </h3>
          <p className='text-[15px] mt-2 dark:text-white'>
            {t?.auth.register['page-lang'].subtitle ||
              'Esto nos ayuda a encontrar contenido mas relevante para ti. No mostraremos esto en tu perfil.'}
          </p>
          <div className='mt-5 mb-[120px]'>
            <SelectCountry />
            <SelectLanguage />
          </div>
          <ButtonStyled
            className='bg-redPinterestBg w-full text-white hover:bg-red-800'
            disabled={false}
            handleClick={handleClick}
          >
            {t?.auth.register['page-lang'].button || 'Siguiente'}
          </ButtonStyled>
        </div>
      </ModalStyled>
    </div>
  );
};

export default NationalityModal;
