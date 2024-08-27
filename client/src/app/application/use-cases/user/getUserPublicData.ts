import { fetchGetUserPublicDataAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserPublicData } from '@/app/domain/types';

export const getUserPublicDataCase =
  async (): Promise<UserPublicData | null> => {
    const response = await fetchGetUserPublicDataAdapter();
    return !response ? null : response;
  };
