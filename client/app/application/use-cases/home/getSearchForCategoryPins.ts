import { PinInterface } from '../../../domain/types/pins-structure';
import { getPinSearchCategoriesAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getPinSearchCategoriesCase = async (
  category: string,
  page: number,
  limit: number
): Promise<PinInterface[] | []> => {
  return await getPinSearchCategoriesAdapter(category, page, limit);
};
