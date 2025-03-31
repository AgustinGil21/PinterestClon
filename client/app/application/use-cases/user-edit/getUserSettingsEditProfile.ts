import { fetchUserSettingsEditProfileAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserSettingsEditProfile } from '../../../domain/types';

export const getUserSettingsEditProfileCase =
  async (): Promise<UserSettingsEditProfile | null> => {
    const response = await fetchUserSettingsEditProfileAdapter();
    return !response ? null : response;
  };
