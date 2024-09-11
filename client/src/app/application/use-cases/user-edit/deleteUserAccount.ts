import { deleteUserAccountAdapter } from '@/app/infrastructure/adapters/UserAdapter';

export const deleteUserAccountCase = async () => {
  await deleteUserAccountAdapter();
};
