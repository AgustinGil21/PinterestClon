import {
  GetPinsInterface,
  PinInterface,
} from '../../../domain/types/pins-structure';
import { getSearchPinsAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getSearchPinsCase = async (
  value: string,
  page: number,
  limit: number
): Promise<PinInterface[] | []> => {
  return getSearchPinsAdapter(value, page, limit);
};
