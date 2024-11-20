import { SearchUserProfileInterface } from '@/app/domain/types/data-users';
import { getSearchUserProfileAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const getSearchUserProfileCase = async (
  username: string
): Promise<SearchUserProfileInterface | null> => {
  return await getSearchUserProfileAdapter(username);
};
