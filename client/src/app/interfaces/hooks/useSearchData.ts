import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
    isModalSearchHeaderOpen,
    getSearchPins,
    searchUsers,
  } = useAppsStore();

  useEffect(() => {
    if (page === 1) return;

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
  }, [page]);

  const handleSearch = async (query: string) => {
    localStorage.setItem('searchInputValue', query);
    updateDataSearch('value', query);
    updateDataSearch('searchPins', []),
      updateStateBoards('searchedBoards', []),
      updateDataUsersSearch(' usersProfile', []);
    updateValueSearchInput(value);

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
