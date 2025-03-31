import { patchAvatarAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserPatchAvatar } from '../../../domain/types';

export const patchAvatarCase = async (data: UserPatchAvatar) => {
  await patchAvatarAdapter(data);
  window.location.reload();
};
