import { FollowersListInterface } from '@/app/domain/types/data-users';
import { getFollowersListAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const getFollowersListCase = async (
  username: string
): Promise<FollowersListInterface> => {
  return await getFollowersListAdapter(username);
};
