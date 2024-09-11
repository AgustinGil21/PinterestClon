import { patchProfileVisibilityPrivateAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserProfileVisibility } from '@/app/domain/types';

export const patchProfileVisibilityPrivateCase = async (
  data: UserProfileVisibility
) => {
  await patchProfileVisibilityPrivateAdapter(data);
};
