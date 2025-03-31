import { patchProfileVisibilityPrivateAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserProfileVisibility } from '../../../domain/types';

export const patchProfileVisibilityPrivateCase = async (
  data: UserProfileVisibility
) => {
  await patchProfileVisibilityPrivateAdapter(data);
};
