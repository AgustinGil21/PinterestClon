import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import InputStyled from '../interfaces/components/Basic/InputStyled';
import { useState } from 'react';
import useSearchData from '../interfaces/hooks/useSearchData';
import { useEffect } from 'react';
import Filter from './Filter';

const AsideFilters = () => {
  const {
    t,
    filterState,
    setFiltersState,
    searchBoards,
    getSearchPins,
    updateDataSearch,
    value,
    updateStateBoards,
  } = useAppsStore();
  const { handleSearch } = useSearchData({
    getSearchBoards: searchBoards,
    getSearchPins: getSearchPins,
  });
  const [selectedFilter, setSelectedFilter] = useState<string>(filterState);
  const [isExecute, setIsExecute] = useState(false);

  useEffect(() => {
    if (!value || !isExecute) return;
    const executeSearch = async () => {
      await handleSearch(value);
    };

    if (filterState) {
      executeSearch();
    }
  }, [filterState]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleClick = () => {
    if (selectedFilter === filterState) return;
    localStorage.setItem('valueFilter', selectedFilter);
    setIsExecute(true);
    setFiltersState(selectedFilter);

    updateDataSearch('searchPins', []);
    updateStateBoards('searchedBoards', []);
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
          <Filter
            value={'pines'}
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
            labelFilter='Todos los pines'
          />
          <Filter
            labelFilter='Tableros'
            value={'tableros'}
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
          />
          <Filter
            labelFilter='Perfiles'
            value='perfiles'
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
          />
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
