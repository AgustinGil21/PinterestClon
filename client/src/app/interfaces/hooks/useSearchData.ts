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

  useEffect(() => {
    if (!localSearchValue) {
      const storedValue = localStorage.getItem('searchInputValue');
      setLocalSearchValue(storedValue);
    }
  }, []);

  // useEffect(() => {
  //   if (!searchPins.length && localSearchValue) {
  //     updateDataSearch('value', localSearchValue);

  //     if (value) {
  //       if (filterState === 'pines') {
  //         getSearchPins(value, 1, pinsLimit);
  //       }
  //       if (filterState === 'tableros') {
  //         getSearchBoards({ value: value, page: 1, limit: boardsLimit });
  //       }

  //       if (filterState === 'perfiles') {
  //         getSearchUsers({ value: value, page: 1, limit: 25 });
  //       }
  //     }
  //   }
  // }, []);

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
      await getSearchBoards({ value: query, page: 1, limit: limit });
      router.push(`/search?query=${query}`);
      return;
    }

    if (filterState === 'pines') {
      console.log(query, page, pinsLimit);
      await getSearchPins(query, 1, pinsLimit);
      router.push(`/search?query=${query}`);
      return;
    }

    if (filterState === 'perfiles') {
      await getSearchUsers({ value: value, page: 1, limit: boardsLimit });
      router.push(`/search?query=${query}`);
      return;
    }
  };

  return {
    handleSearch,
  };
};

export default useSearchData;
