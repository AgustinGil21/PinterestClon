import { fetchUserAccountManagementAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserDataAccountEdit } from '../../../domain/types';

export const getUserAccountManagementCase =
  async (): Promise<UserDataAccountEdit | null> => {
    const response = await fetchUserAccountManagementAdapter();
    return !response ? null : response;
  };
