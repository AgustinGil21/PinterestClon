import { fetchUserLoggedAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserPublicData } from '../../../domain/types';

export const getUserLoggedCase = async (): Promise<UserPublicData | null> => {
  const response = await fetchUserLoggedAdapter();
  return !response ? null : response;
};
