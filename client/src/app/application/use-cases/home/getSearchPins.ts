import {
  GetPinsInterface,
  PinInterface,
} from '@/app/domain/types/pins-structure';
import { getSearchPinsAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getSearchPinsCase = async (
  value: string,
  page: number,
  limit: number
): Promise<PinInterface[] | []> => {
  return getSearchPinsAdapter(value, page, limit);
};
