import { postLogOutUserAdapter } from '../../../infrastructure/adapters/UserAdapter';

export const logoutUserCase = async (): Promise<void> => {
  await postLogOutUserAdapter();
  window.location.reload();
};
