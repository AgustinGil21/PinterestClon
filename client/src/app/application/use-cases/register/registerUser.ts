import { postRegisterUser } from '@/app/infrastructure/adapters/UserAdapter';
import { UserRegister } from '../../domain/types';

export const registerUser = async (data: UserRegister): Promise<void> => {
  await postRegisterUser(data);
};
