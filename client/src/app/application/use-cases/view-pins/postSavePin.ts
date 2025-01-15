import { postSavePinAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const postSavePinCase = async (data: string) => {
  return await postSavePinAdapter(data);
};
