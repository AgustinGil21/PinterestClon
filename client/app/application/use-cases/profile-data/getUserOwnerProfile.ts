import { OwnerProfileInterface } from '../../../domain/types/data-users';
import { getUserOwnerProfileAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const getUserOwnerProfileCase =
  async (): Promise<OwnerProfileInterface | null> => {
    return await getUserOwnerProfileAdapter();
  };
