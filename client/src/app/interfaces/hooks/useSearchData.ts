import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ISearchByValue } from '@/app/domain/types/boards-interface';

interface InterfaceUseSearchData {
  getSearchBoards: ({ value, page, limit }: ISearchByValue) => Promise<void>;
  getSearchPins: (value: string, page: number, limit: number) => Promise<void>;
}

const useSearchData = ({
  getSearchBoards,
  getSearchPins,
}: InterfaceUseSearchData) => {
  const limit = 25;
  const router = useRouter();
  const {
    page,
    value,
    filterState,
    updateDataSearch,
    searchPins,
    updateValueSearchInput,
  } = useAppsStore();
  const [localSearchValue, setLocalSearchValue] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('searchInputValue');
    setLocalSearchValue(storedValue);
  }, []);

  useEffect(() => {
    if (!searchPins.length && localSearchValue && !isSearching) {
      updateDataSearch('value', localSearchValue);

      if (value) {
        if (filterState === 'pines') getSearchPins(value, page, limit);
        if (filterState === 'tableros')
          getSearchBoards({ value: value, page: page, limit: limit });
        // if (filterState === 'perfiles') getSearchBoards(value, page, limit);
        setIsSearching(true);
      }
    }
  }, [localSearchValue]);

  useEffect(() => {
    if (page === 1) return;

    if (filterState === 'tableros') {
      getSearchBoards({ value: value, page: page, limit: limit });
      return;
    }

    if (filterState === 'pines') {
      getSearchPins(value, page, limit);
      return;
    }

    if (filterState === 'perfiles') {
      // getSearchPins(value, page, limit);
      return;
    }
  }, [page, filterState, value, limit, getSearchBoards, getSearchPins]);

  const handleSearch = async (query: string) => {
    localStorage.setItem('searchInputValue', query);
    updateDataSearch('value', query);
    updateValueSearchInput(value);

    if (filterState === 'tableros') {
      await getSearchBoards({ value: query, page: page, limit: limit });
      router.push(`/search?query=${query}`);
      return;
    }

    if (filterState === 'pines') {
      await getSearchPins(query, page, limit);
      router.push(`/search?query=${query}`);
      return;
    }

    if (filterState === 'perfiles') {
      // await getSearchPins(query, page, limit);
      router.push(`/search?query=${query}`);
      return;
    }
  };

  return {
    handleSearch,
  };
};

export default useSearchData;
