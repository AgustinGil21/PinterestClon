import { fetchProfileVisibilityAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserProfileVisibility } from '../../../domain/types';

export const getProfileVisibilityCase =
  async (): Promise<UserProfileVisibility | null> => {
    const response = await fetchProfileVisibilityAdapter();
    return !response ? null : response;
  };
