import { patchProfileVisibilityTypeAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserProfileVisibility } from '@/app/domain/types';

export const patchProfileVisibilityTypeCase = async (
  data: UserProfileVisibility
) => {
  await patchProfileVisibilityTypeAdapter(data);
  window.location.reload();
};
