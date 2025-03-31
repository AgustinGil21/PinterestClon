import { postFollowUserAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const postFollowUserCase = async (
  id: string
): Promise<boolean | null> => {
  return await postFollowUserAdapter(id);
};
