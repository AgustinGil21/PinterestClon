import { CreatedPinsInterface } from '@/app/domain/types/data-users';
import { getCreatedPinsAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const getCreatedPinsCase = async (
  username: string,
  page: number,
  limit: number
): Promise<CreatedPinsInterface[]> => {
  return await getCreatedPinsAdapter(username, page, limit);
};
