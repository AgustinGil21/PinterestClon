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
    page,
    openFiltersModal,
    searchUsers,
    updateStateBoards,
    resetPage,
  } = useAppsStore();
  const { handleSearch } = useSearchData();
  const [selectedFilter, setSelectedFilter] = useState<string>(filterState);
  const [isExecute, setIsExecute] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!value.length || !isExecute) return;
    const executeSearch = async () => {
      await handleSearch(value);
      if (isMobileView) openFiltersModal();
    };

    if (filterState) {
      executeSearch();
    }
  }, [filterState, isExecute]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleClick = () => {
    if (selectedFilter === filterState) return;

    resetPage();
    localStorage.setItem('valueFilter', selectedFilter);
    setIsExecute(true);
    console.log('hola 2');
    setFiltersState(selectedFilter);
  };

  const handleReset = () => {
    setSelectedFilter('pines');
  };

  return (
    <aside
      className='fixed bg-white z-[100] md:z-[0] md:sticky h-screen  w-[270px] p-3  top-[125px] md:top-20 border-r-[1px] border-gray-300 responsivePx:border-none '
      style={{ animation: `ease aside-filters-open 500ms` }}
    >
      <div className='mt-2 dark:text-white '>
        <h4 className='font-semibold text-sm'>
          {t?.filters['main-button'] || 'Filtros'}
        </h4>
        <div className='flex flex-col gap-3 px-4 mt-6'>
          <Filter
            value={'pines'}
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
            labelFilter={t?.filters.pins || 'Todos los pines'}
          />
          <Filter
            labelFilter={t?.filters.boards || 'Tableros'}
            value={'tableros'}
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
          />
          <Filter
            labelFilter={t?.filters.users || 'Perfiles'}
            value='perfiles'
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
          />
        </div>
      </div>
      <div className='relative h-full '>
        <div className='absolute top-5 responsivePx:top-[0px] h-full md:flex flex-row gap-2 pl-2 mt-5 items-start justify-start w-full'>
          <ButtonStyled
            className='bg-redPinterestBg text-white font-semibold hover:bg-red-700 w-full'
            handleClick={handleClick}
          >
            {t?.filters.apply || 'Aplicar'}
          </ButtonStyled>
          <ButtonStyled
            className='bg-buttonGreyBg font-semibold mt-2 md:mt-0 hover:bg-gray-300 w-full'
            handleClick={handleReset}
          >
            {t?.filters.reset || 'Restablecer'}
          </ButtonStyled>
        </div>
      </div>
    </aside>
  );
};

export default AsideFilters;
