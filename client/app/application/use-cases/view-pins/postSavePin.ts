import { postSavePinAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const postSavePinCase = async (data: string) => {
  return await postSavePinAdapter(data);
};
