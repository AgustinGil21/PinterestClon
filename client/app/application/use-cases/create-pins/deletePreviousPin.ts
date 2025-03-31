import { deletePreviousPinAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const deletePreviousPinCase = async (id: string) => {
  await deletePreviousPinAdapter(id);
};
