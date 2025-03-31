import { fetchGendersAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { Gender } from '../../../domain/types';

export const getGendersCase = async (): Promise<Gender[]> => {
  return await fetchGendersAdapter();
};
