import { PinInterface } from '@/app/domain/types/pins-structure';
import { getPinSearchCategoriesAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getPinSearchCategoriesCase = async (
  category: string,
  page: number,
  limit: number
): Promise<PinInterface[] | []> => {
  return await getPinSearchCategoriesAdapter(category, page, limit);
};
