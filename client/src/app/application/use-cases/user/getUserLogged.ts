import { fetchUserLogged } from '@/app/infrastructure/adapters/UserAdapter';
import { UserData } from '@/app/domain/types';

export const getUserLogged = async (): Promise<UserData | null> => {
  const response = await fetchUserLogged();
  return !response?.id ? null : response;
};
