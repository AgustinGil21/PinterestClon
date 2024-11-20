import { fetchGendersAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { Gender } from '@/app/domain/types';

export const getGendersCase = async (): Promise<Gender[]> => {
  return await fetchGendersAdapter();
};
