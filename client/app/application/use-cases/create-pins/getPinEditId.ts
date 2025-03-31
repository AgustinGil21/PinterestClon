import { PinEdit } from '../../../domain/types/pins-structure';
import { getPinEditIdAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getPinEditIdCase = async (id: string): Promise<PinEdit | null> => {
  return await getPinEditIdAdapter(id);
};
