import { GetPinsInterface } from '../../../domain/types/pins-structure';
import { getHomePinsAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getHomePinsCase = async (
  page: number,
  limit: number
): Promise<GetPinsInterface | []> => {
  return getHomePinsAdapter(page, limit);
};
