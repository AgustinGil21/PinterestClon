import { postLoginUserAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserLogin } from '../../../domain/types';

export const loginUserCase = async (data: UserLogin): Promise<void> => {
  await postLoginUserAdapter(data);
};
