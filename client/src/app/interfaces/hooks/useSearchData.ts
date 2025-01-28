import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ISearchByValue } from '@/app/domain/types/boards-interface';
import { useGetLimit } from '@/app/hooks/useGetLimit';

interface InterfaceUseSearchData {
  getSearchBoards: ({ value, page, limit }: ISearchByValue) => Promise<void>;
  getSearchPins: (value: string, page: number, limit: number) => Promise<void>;
  getSearchUsers: any;
}

const useSearchData = ({
  getSearchBoards,
  getSearchPins,
  getSearchUsers,
}: InterfaceUseSearchData) => {
  const limit = 25;
  const pinsLimit = useGetLimit({
    parentPadding: 16,
    elementMaxWidth: 236,
    elementMinHeight: 239,
  });
  const boardsLimit = useGetLimit({
    parentPadding: 16,
    elementMaxWidth: 248,
    elementMinHeight: 212,
  });

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
        if (filterState === 'pines') getSearchPins(value, page, pinsLimit);
        if (filterState === 'tableros')
          getSearchBoards({ value: value, page: page, limit: boardsLimit });
        if (filterState === 'perfiles')
          getSearchUsers({ value: value, page: page, limit: boardsLimit });
        setIsSearching(true);
      }
    }
  }, [localSearchValue]);

  useEffect(() => {
    if (page === 1) return;

    if (filterState === 'tableros') {
      getSearchBoards({ value: value, page: page, limit: boardsLimit });
      return;
    }

    if (filterState === 'pines') {
      getSearchPins(value, page, pinsLimit);
      return;
    }

    if (filterState === 'perfiles') {
      getSearchUsers({ value: value, page: page, limit: boardsLimit });
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
      await getSearchPins(query, page, pinsLimit);
      router.push(`/search?query=${query}`);
      return;
    }

    if (filterState === 'perfiles') {
      await getSearchUsers({ value: value, page: page, limit: boardsLimit });
      router.push(`/search?query=${query}`);
      return;
    }
  };

  return {
    handleSearch,
  };
};

export default useSearchData;
