import React, { useState } from 'react';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import InputStyled from '../interfaces/components/Basic/InputStyled';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface InterfaceAsideFilters {}

const AsideFilters = ({}: InterfaceAsideFilters) => {
  const {
    searchBoards,
    searchedBoards,
    value,
    setFiltersState,
    filterState,
    getSearchPins,
  } = useAppsStore();
  const pathname = usePathname();
  const [selectedFilter, setSelectedFilter] = useState<string>(filterState);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleClick = () => {
    setFiltersState(selectedFilter);
    localStorage.setItem('filterState', selectedFilter);
    if (selectedFilter === 'tableros') {
      searchBoards({ value: value, page: 1, limit: 25 });
    }

    if (selectedFilter === 'pines') {
      getSearchPins(value, 1, 25);
    }
  };

  const handleReset = () => {
    setSelectedFilter('pines');
  };

  return (
    <aside className='h-[92vh] sticky top-20 w-[270px] p-3 border-r-2'>
      <div className='mt-2 dark:text-white'>
        <h4 className='font-semibold text-sm'>Filtros</h4>
        <div className='flex flex-col gap-3 px-4 mt-6'>
          <div className='flex items-center justify-between text-sm'>
            <span>Todos los pines</span>
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
            <span>Tableros</span>
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
            <span>Perfiles</span>
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
      <div className='absolute bottom-12 flex flex-row gap-2 justify-center items-center pl-4'>
        <ButtonStyled
          className='bg-redPinterestBg text-white font-semibold hover:bg-red-700'
          handleClick={handleClick}
        >
          Aplicar
        </ButtonStyled>
        <ButtonStyled
          className='bg-buttonGreyBg font-semibold hover:bg-gray-300'
          handleClick={handleReset}
        >
          Restablecer
        </ButtonStyled>
      </div>
      {/* <p className='mt-4 text-sm text-gray-500'>
        Filtro seleccionado: {selectedFilter}
      </p> */}
    </aside>
  );
};

export default AsideFilters;
