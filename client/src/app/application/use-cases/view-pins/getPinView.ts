import { PinViewInterface } from '@/app/domain/types/pins-structure';
import { getPinViewAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getPinViewCase = async (
  id: string
): Promise<PinViewInterface | null> => {
  return await getPinViewAdapter(id);
};
