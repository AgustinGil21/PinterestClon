import { postLogOutUser } from '@/app/infrastructure/adapters/UserAdapter';

export const logoutUser = async (): Promise<void> => {
  await postLogOutUser();
};
