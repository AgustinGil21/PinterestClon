import { postLoginUserAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserLogin } from '@/app/domain/types';

export const loginUserCase = async (data: UserLogin): Promise<void> => {
  await postLoginUserAdapter(data);
};
