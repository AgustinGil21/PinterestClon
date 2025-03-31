import { FollowersListInterface } from '../../../domain/types/data-users';
import { getFollowersListAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const getFollowersListCase = async (
  username: string
): Promise<FollowersListInterface> => {
  return await getFollowersListAdapter(username);
};
