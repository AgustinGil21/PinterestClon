import { postRegisterUserAdapter } from '@/app/infrastructure/adapters/UserAdapter';

export const registerUserCase = async (data: FormData): Promise<void> => {
  await postRegisterUserAdapter(data);
};
