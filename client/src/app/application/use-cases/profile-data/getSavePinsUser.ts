import { CreatedPinsInterface } from '@/app/domain/types/data-users';
import { PinInterface } from '@/app/domain/types/pins-structure';
import { getSavePinsAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getSavePinsCase = async (
  username: string,
  page: number,
  limit: number
): Promise<PinInterface[]> => {
  return await getSavePinsAdapter(username, page, limit);
};
