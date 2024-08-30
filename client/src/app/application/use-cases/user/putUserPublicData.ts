import { putUserSettingsEditProfileAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserSettingsEditProfile } from '@/app/domain/types';

export const putUserSettingsEditProfileCase = async (
  data: UserSettingsEditProfile
) => {
  await putUserSettingsEditProfileAdapter(data);
};
