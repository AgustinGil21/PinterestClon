import { SearchUserProfileInterface } from '../../../domain/types/data-users';
import { getSearchUserProfileAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const getSearchUserProfileCase = async (
  username: string
): Promise<SearchUserProfileInterface | null> => {
  return await getSearchUserProfileAdapter(username);
};
