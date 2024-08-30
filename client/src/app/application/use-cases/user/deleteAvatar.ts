import { deleteAvatarAdapter } from '@/app/infrastructure/adapters/UserAdapter';

export const deleteAvatarCase = async () => {
  await deleteAvatarAdapter();
};
