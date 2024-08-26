import { fetchUserLoggedAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserPublicData } from '@/app/domain/types';

export const getUserLoggedCase = async (): Promise<UserPublicData | null> => {
  const response = await fetchUserLoggedAdapter();
  console.log(response);
  return !response ? null : response;
};
