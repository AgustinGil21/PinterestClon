import { patchProfileVisibilityTypeAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserProfileVisibility } from '../../../domain/types';

export const patchProfileVisibilityTypeCase = async (
  data: UserProfileVisibility
) => {
  await patchProfileVisibilityTypeAdapter(data);
  window.location.reload();
};
