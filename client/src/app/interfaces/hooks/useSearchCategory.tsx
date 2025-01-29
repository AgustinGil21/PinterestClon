import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetLimit } from '@/app/hooks/useGetLimit';

interface InterfaceUseSearchCategory {
  getSearchPinForCategory: any;
}

const useSearchCategory = ({
  getSearchPinForCategory,
}: InterfaceUseSearchCategory) => {
  const pinsLimit = useGetLimit({
    parentPadding: 16,
    elementMaxWidth: 236,
    elementMinHeight: 239,
  });

  const { page, updateDataSearch, categorySelect, resetPage } = useAppsStore();
  const router = useRouter();
  const [idCategory, setIdCategory] = useState<string | null>('');
  const [queryValue, setQueryValue] = useState<string | null>('');

  const pathname = usePathname();

  useEffect(() => {
    const idCategoryStorage = localStorage.getItem('idCategory');
    const queryValueStorage = localStorage.getItem('queryValueCateogry');

    setIdCategory(idCategoryStorage);
    setQueryValue(queryValueStorage);
  }, []);

  useEffect(() => {
    if (
      idCategory &&
      queryValue &&
      !pathname.includes('explore') &&
      pathname.includes('searchcategory')
    ) {
      updateDataSearch('categorySelect', idCategory);
      updateDataSearch('value', '');

      if (!categorySelect) {
        getSearchPinForCategory(idCategory, 1, pinsLimit);
      }
    }
  }, [idCategory, queryValue]);

  useEffect(() => {
    if (page === 1) return;

    if (categorySelect) {
      getSearchPinForCategory(idCategory, page, pinsLimit);
    }
  }, [page]);

  const handleSearchCategory = async (
    idCategory: string,
    queryValue: string | undefined
  ) => {
    resetPage();
    if (idCategory && queryValue) {
      localStorage.setItem('idCategory', idCategory);
      localStorage.setItem('queryValueCateogry', queryValue);
    }
    updateDataSearch('value', '');
    updateDataSearch('categorySelect', idCategory);
    await getSearchPinForCategory(idCategory, 1, pinsLimit);

    router.push(`/searchcategory/${queryValue}`);
  };

  return {
    handleSearchCategory,
  };
};

export default useSearchCategory;
