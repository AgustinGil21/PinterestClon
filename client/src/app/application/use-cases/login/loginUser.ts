import { postLoginUser } from '@/app/infrastructure/adapters/UserAdapter';
import { UserLogin } from '../../domain/types';

export const loginUser = async (data: UserLogin): Promise<void> => {
  await postLoginUser(data);
};
