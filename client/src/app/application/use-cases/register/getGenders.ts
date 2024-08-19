import { fetchGenders } from '@/app/infrastructure/adapters/UserAdapter';
import { Gender } from '@/app/domain/types';

export const getGenders = async (): Promise<Gender[]> => {
  return await fetchGenders();
};
