import { postEmailUserAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserEmail } from '../../../domain/types';

export const updateUserEmailCase = async (data: UserEmail): Promise<void> => {
  await postEmailUserAdapter(data);
};
