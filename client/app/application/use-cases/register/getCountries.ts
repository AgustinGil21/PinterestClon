import { fetchCountriesAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { Country } from '../../../domain/types';

export const getCountriesCase = async (): Promise<Country[]> => {
  return await fetchCountriesAdapter();
};
