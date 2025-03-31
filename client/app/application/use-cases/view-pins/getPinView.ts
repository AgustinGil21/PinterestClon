import { PinViewInterface } from '../../../domain/types/pins-structure';
import { getPinViewAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getPinViewCase = async (
  id: string
): Promise<PinViewInterface | null> => {
  return await getPinViewAdapter(id);
};
