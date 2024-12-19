import { FollowingsListInterface } from '@/app/domain/types/data-users';
import { getFollowingsListAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const getFollowingsListCase = async (
  username: string
): Promise<FollowingsListInterface> => {
  return await getFollowingsListAdapter(username);
};
