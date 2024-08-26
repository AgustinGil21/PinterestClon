import { postEmailUserAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserEmail } from '@/app/domain/types';

export const updateUserEmailCase = async (data: UserEmail): Promise<void> => {
  await postEmailUserAdapter(data);
};
