import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import InputStyled from '../interfaces/components/Basic/InputStyled';
import { useState } from 'react';

const AsideFilters = () => {
  const { t, filterState, setFiltersState, openFiltersModal } = useAppsStore();
  const [selectedFilter, setSelectedFilter] = useState<string>(filterState);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleClick = () => {
    setFiltersState(selectedFilter);
    openFiltersModal();
  };

  const handleReset = () => {
    setSelectedFilter('pines');
  };

  return (
    <aside
      className='sticky h-screen w-[270px] p-3 border-r-2'
      style={{ animation: `ease aside-filters-open 500ms` }}
    >
      <div className='mt-2 dark:text-white'>
        <h4 className='font-semibold text-sm'>
          {t?.filters['main-button'] || 'Filtros'}
        </h4>
        <div className='flex flex-col gap-3 px-4 mt-6'>
          <div className='flex items-center justify-between text-sm'>
            <span>{t?.filters.pins || 'Todos los pines'}</span>
            <InputStyled
              infoName='pines'
              type='radio'
              value='pines'
              classProps='form-radio h-3 w-3 text-black focus:ring-blue-500 custom-radio'
              onClick={() => handleFilterClick('pines')}
              checked={selectedFilter === 'pines'}
            />
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span>{t?.filters.boards || 'Tableros'}</span>
            <InputStyled
              infoName='tableros'
              type='radio'
              value='tableros'
              classProps='form-radio h-3 w-3 text-black focus:ring-blue-500 custom-radio'
              onClick={() => handleFilterClick('tableros')}
              checked={selectedFilter === 'tableros'}
            />
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span>{t?.filters.users || 'Perfiles'}</span>
            <InputStyled
              infoName='perfiles'
              type='radio'
              value='perfiles'
              classProps='form-radio h-3 w-3 text-black focus:ring-blue-500 custom-radio'
              onClick={() => handleFilterClick('perfiles')}
              checked={selectedFilter === 'perfiles'}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-2 pl-2 mt-5 items-start justify-start w-full'>
        <ButtonStyled
          className='bg-redPinterestBg text-white font-semibold hover:bg-red-700 w-full'
          handleClick={handleClick}
        >
          {t?.filters.apply || 'Aplicar'}
        </ButtonStyled>
        <ButtonStyled
          className='bg-buttonGreyBg font-semibold hover:bg-gray-300 w-full'
          handleClick={handleReset}
        >
          {t?.filters.reset || 'Restablecer'}
        </ButtonStyled>
      </div>
    </aside>
  );
};

export default AsideFilters;
