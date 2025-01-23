import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import InputStyled from '../interfaces/components/Basic/InputStyled';

const AsideFilters = () => {
  const { t } = useAppsStore();

  return (
    <aside className='h-[92vh] sticky top-20 w-[270px] p-3 border-r-2'>
      <div className='mt-2 dark:text-white'>
        <h4 className='font-semibold text-sm'>
          {t?.filters['main-button'] || 'Filtros'}
        </h4>
        <div className='flex flex-col gap-3 px-4 mt-6'>
          <div className='flex items-center justify-between text-sm'>
            <span>{t?.filters.pins || 'Todos los pines'}</span>
            <InputStyled
              type='radio'
              classProps='form-radio h-3 w-3 text-black focus:ring-blue-500 custom-radio'
            />
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span>{t?.filters.boards || 'Tableros'}</span>
            <InputStyled
              type='radio'
              classProps='form-radio h-3 w-3 text-black focus:ring-blue-500 custom-radio'
            />
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span>{t?.filters.users || 'Perfiles'}</span>
            <InputStyled
              type='radio'
              classProps='form-radio h-3 w-3 text-black focus:ring-blue-500 custom-radio'
            />
          </div>
        </div>
      </div>
      <div className='absolute bottom-12 flex flex-row gap-2 justify-center items-center pl-4'>
        <ButtonStyled className='bg-redPinterestBg text-white font-semibold hover:bg-red-700'>
          {t?.filters.apply || 'Aplicar'}
        </ButtonStyled>
        <ButtonStyled className='bg-buttonGreyBg font-semibold hover:bg-gray-300'>
          {t?.filters.reset || 'Restablecer'}
        </ButtonStyled>
      </div>
    </aside>
  );
};

export default AsideFilters;
