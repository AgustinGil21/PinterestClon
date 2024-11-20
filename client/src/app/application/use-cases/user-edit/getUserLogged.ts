import { fetchUserLoggedAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserPublicData } from '@/app/domain/types';

export const getUserLoggedCase = async (): Promise<UserPublicData | null> => {
  const response = await fetchUserLoggedAdapter();
  return !response ? null : response;
};
