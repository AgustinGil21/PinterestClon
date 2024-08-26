import { fetchCountriesAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { Country } from '@/app/domain/types';

export const getCountriesCase = async (): Promise<Country[]> => {
  return await fetchCountriesAdapter();
};
