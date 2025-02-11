import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetLimit } from '@/app/hooks/useGetLimit';

const useSearchData = () => {
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
    updateStateBoards,
    updateDataUsersSearch,
    updateValueSearchInput,
    searchBoards,
    getSearchPins,
    searchUsers,
  } = useAppsStore();

  const [process, setProcess] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!value.length) {
      updateDataSearch('value', query);
      if (filterState === 'tableros') {
        searchBoards({ value: query, page: page, limit: boardsLimit });
        return;
      }

      if (filterState === 'pines') {
        getSearchPins(query, page, pinsLimit);
        return;
      }

      if (filterState === 'perfiles') {
        searchUsers({ value: query, page: page, limit: 25 });
        return;
      }
    }
  }, [query]);

  useEffect(() => {
    if (page !== 1) setProcess(true);
    if (page === 1 || !value.length || !process) return;

    if (filterState === 'tableros') {
      searchBoards({ value: value, page: page, limit: boardsLimit });
      return;
    }

    if (filterState === 'pines') {
      getSearchPins(value, page, pinsLimit);
      return;
    }

    if (filterState === 'perfiles') {
      searchUsers({ value: value, page: page, limit: 25 });
      return;
    }
  }, [page, process]);

  const handleSearch = async (query: string) => {
    localStorage.setItem('searchInputValue', query);
    updateDataUsersSearch('usersProfile', []);
    updateStateBoards('searchedBoards', []);
    updateDataSearch('searchPins', []);
    updateDataSearch('value', query);
    updateValueSearchInput(value);
    setProcess(true);

    if (filterState === 'tableros') {
      await searchBoards({ value: query, page: 1, limit: boardsLimit });
      router.push(`/search?query=${query}`);
      return;
    }

    if (filterState === 'pines') {
      await getSearchPins(query, 1, pinsLimit);
      router.push(`/search?query=${query}`);
      return;
    }

    if (filterState === 'perfiles') {
      await searchUsers({ value: value, page: 1, limit: limit });
      router.push(`/search?query=${query}`);
      return;
    }
  };

  return {
    handleSearch,
  };
};

export default useSearchData;
