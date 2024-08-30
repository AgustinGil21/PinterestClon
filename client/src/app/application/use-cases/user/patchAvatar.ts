import { patchAvatarAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserPatchAvatar } from '@/app/domain/types';

export const patchAvatarCase = async (data: UserPatchAvatar) => {
  await patchAvatarAdapter(data);
};
