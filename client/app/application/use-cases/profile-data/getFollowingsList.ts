import { FollowingsListInterface } from '../../../domain/types/data-users';
import { getFollowingsListAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const getFollowingsListCase = async (
  username: string
): Promise<FollowingsListInterface> => {
  return await getFollowingsListAdapter(username);
};
