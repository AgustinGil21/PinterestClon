import { OwnerProfileInterface } from '@/app/domain/types/data-users';
import { getUserOwnerProfileAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const getUserOwnerProfileCase =
  async (): Promise<OwnerProfileInterface | null> => {
    return await getUserOwnerProfileAdapter();
  };
