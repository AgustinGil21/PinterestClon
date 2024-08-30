import { fetchUserAccountManagementAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserDataAccountEdit } from '@/app/domain/types';

export const getUserAccountManagementCase =
  async (): Promise<UserDataAccountEdit | null> => {
    const response = await fetchUserAccountManagementAdapter();
    return !response ? null : response;
  };
