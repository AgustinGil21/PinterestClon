import { deleteAvatarAdapter } from '../../../infrastructure/adapters/UserAdapter';

export const deleteAvatarCase = async () => {
  await deleteAvatarAdapter();
};
