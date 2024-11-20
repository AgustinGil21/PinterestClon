import { fetchLanguagesAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { Language } from '@/app/domain/types';

export const getLanguagesCase = async (): Promise<Language[]> => {
  return await fetchLanguagesAdapter();
};
