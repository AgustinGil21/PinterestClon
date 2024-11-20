import { GetPinsInterface } from '@/app/domain/types/pins-structure';
import { getHomePinsAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getHomePinsCase = async (
  page: number,
  limit: number
): Promise<GetPinsInterface | []> => {
  return getHomePinsAdapter(page, limit);
};
