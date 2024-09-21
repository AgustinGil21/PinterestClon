import { PinEdit } from '@/app/domain/types/pins-structure';
import { getPinEditIdAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getPinEditIdCase = async (id: string): Promise<PinEdit | null> => {
  return await getPinEditIdAdapter(id);
};
