import { GetPinsInterface } from '@/app/domain/types/pins-structure';
import { getHomePins } from '@/app/infrastructure/adapters/PinsAdapter';

export const getHomePinsCase = async (
  page: number,
  limit: number
): Promise<GetPinsInterface | []> => {
  return getHomePins(page, limit);
};
