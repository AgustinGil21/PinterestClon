import { fetchProfileVisibilityAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserProfileVisibility } from '@/app/domain/types';

export const getProfileVisibilityCase =
  async (): Promise<UserProfileVisibility | null> => {
    const response = await fetchProfileVisibilityAdapter();
    return !response ? null : response;
  };
