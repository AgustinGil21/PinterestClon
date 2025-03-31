import { putUserSettingsEditProfileAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserSettingsEditProfile } from '../../../domain/types';

export const putUserSettingsEditProfileCase = async (
  data: UserSettingsEditProfile
) => {
  await putUserSettingsEditProfileAdapter(data);
  window.location.reload();
};
