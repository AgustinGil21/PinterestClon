import { postEmailUser } from '@/app/infrastructure/adapters/UserAdapter';
import { UserEmail } from '../../domain/types';

export const updateUserEmail = async (data: UserEmail): Promise<void> => {
  await postEmailUser(data);
};
