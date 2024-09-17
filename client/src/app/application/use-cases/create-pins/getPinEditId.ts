import { PinCreate } from '@/app/domain/types/pins-structure';
import { getPinEditIdAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getPinEditIdCase = async (
  id: string
): Promise<PinCreate | null> => {
  return await getPinEditIdAdapter(id);
};
