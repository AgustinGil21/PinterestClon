import { CategoriesPin } from '@/app/domain/types/pins-structure';
import { getCategoriesPinAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getCategoriesPinsCase = async (): Promise<CategoriesPin[]> => {
  return await getCategoriesPinAdapter();
};
