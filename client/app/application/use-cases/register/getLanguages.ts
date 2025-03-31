import { fetchLanguagesAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { Language } from '../../../domain/types';

export const getLanguagesCase = async (): Promise<Language[]> => {
  return await fetchLanguagesAdapter();
};
