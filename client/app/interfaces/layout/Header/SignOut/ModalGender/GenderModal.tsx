import ModalStyled from '../../../../components/Basic/ModalStyled';

import FormGender from './FormGender';
import { useAppsStore } from '../../../../../infrastructure/stores/useAppStore';

const GenderModal = () => {
  const { t } = useAppsStore();

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center '>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <ModalStyled classProps='relative z-50 max-w-[425px] px-7  bg-white py-6 bottom-5 shadow-lg rounded-[18px] flex flex-col  gap-6 items-center '>
        <div className='text-black text-center max-w-[300px] dark:text-white'>
          <h3 className='font-bold text-2xl'>
            {t?.auth.register['page-gender'].title || '¿Cual es tu género?'}
          </h3>
          <p className='text-[15px] mt-2 dark:text-white'>
            {t?.auth.register['page-gender'].subtitle ||
              'Esto nos ayuda a encontrar contenido mas relevante para ti. No mostraremos esto en tu perfil.'}
          </p>
        </div>
        <div className='flex items-start w-full '></div>
        <FormGender />
      </ModalStyled>
    </div>
  );
};

export default GenderModal;
