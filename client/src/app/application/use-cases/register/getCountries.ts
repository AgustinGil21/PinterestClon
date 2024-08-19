import { fetchCountries } from '@/app/infrastructure/adapters/UserAdapter';
import { Country } from '@/app/domain/types';

export const getCountries = async (): Promise<Country[]> => {
  return await fetchCountries();
};
