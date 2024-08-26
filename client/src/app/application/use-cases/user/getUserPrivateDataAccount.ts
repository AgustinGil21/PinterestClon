import { fetchUserEditDataAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserDataAccountEdit } from '@/app/domain/types';

export const getUserPrivateDataAccountCase =
  async (): Promise<UserDataAccountEdit | null> => {
    const response = await fetchUserEditDataAdapter();
    return !response ? null : response;
  };
