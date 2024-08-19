import { fetchLanguages } from '@/app/infrastructure/adapters/UserAdapter';
import { Language } from '@/app/domain/types';

export const getLanguages = async (): Promise<Language[]> => {
  return await fetchLanguages();
};
