import { fetchUserSettingsEditProfileAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserSettingsEditProfile } from '@/app/domain/types';

export const getUserSettingsEditProfileCase =
  async (): Promise<UserSettingsEditProfile | null> => {
    const response = await fetchUserSettingsEditProfileAdapter();
    return !response ? null : response;
  };
