import { CategoriesPin } from '../../../domain/types/pins-structure';
import { getCategoriesPinAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getCategoriesPinsCase = async (): Promise<CategoriesPin[]> => {
  return await getCategoriesPinAdapter();
};
