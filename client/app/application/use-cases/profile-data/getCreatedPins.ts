import { CreatedPinsInterface } from '../../../domain/types/data-users';
import { getCreatedPinsAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const getCreatedPinsCase = async (
  username: string,
  page: number,
  limit: number
): Promise<CreatedPinsInterface[]> => {
  return await getCreatedPinsAdapter(username, page, limit);
};
