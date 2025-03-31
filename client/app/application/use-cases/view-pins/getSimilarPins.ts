import {
  GetPinsInterface,
  PinSimilarInterface,
} from '../../../domain/types/pins-structure';
import { getSimilarPinsAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getSimilarPinsCase = async (
  id: string,
  page: number,
  limit: number
): Promise<PinSimilarInterface[] | []> => {
  return await getSimilarPinsAdapter(id, page, limit);
};
