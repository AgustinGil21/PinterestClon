import { deleteUserAccountAdapter } from '../../../infrastructure/adapters/UserAdapter';

export const deleteUserAccountCase = async () => {
  await deleteUserAccountAdapter();
};
