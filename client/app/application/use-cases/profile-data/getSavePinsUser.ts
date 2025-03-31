import { CreatedPinsInterface } from '../../../domain/types/data-users';
import { PinInterface } from '../../../domain/types/pins-structure';
import { getSavePinsAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getSavePinsCase = async (
  username: string,
  page: number,
  limit: number
): Promise<PinInterface[]> => {
  return await getSavePinsAdapter(username, page, limit);
};
