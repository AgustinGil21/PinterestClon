import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface InterfaceUseSearchCategory {
  getSearchPinForCategory: any;
}

const useSearchCategory = ({
  getSearchPinForCategory,
}: InterfaceUseSearchCategory) => {
  const { page, updateDataSearch, categorySelect } = useAppsStore();
  const limit = 25;
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
    if (idCategory && queryValue && !pathname.includes('explore')) {
      updateDataSearch('categorySelect', idCategory);
      updateDataSearch('value', '');

      if (!categorySelect) {
        getSearchPinForCategory(idCategory, page, limit);
      }
    }
  }, [idCategory, queryValue]);

  const handleSearchCategory = async (
    idCategory: string,
    queryValue: string | undefined
  ) => {
    if (idCategory && queryValue) {
      localStorage.setItem('idCategory', idCategory);
      localStorage.setItem('queryValueCateogry', queryValue);
    }
    updateDataSearch('value', '');
    updateDataSearch('categorySelect', idCategory);
    await getSearchPinForCategory(idCategory, page, limit);

    router.push(`/searchcategory/${queryValue}`);
  };

  return {
    handleSearchCategory,
  };
};

export default useSearchCategory;
