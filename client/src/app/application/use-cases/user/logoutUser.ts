import { postLogOutUserAdapter } from '@/app/infrastructure/adapters/UserAdapter';

export const logoutUserCase = async (): Promise<void> => {
  await postLogOutUserAdapter();
};
