import { CreatedPinsInterface } from '@/app/domain/types/data-users';
import { getCreatedPinsAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const getCreatedPinsCase = async (
  username: string,
  limit: number,
  page: number
): Promise<CreatedPinsInterface[]> => {
  return await getCreatedPinsAdapter(username, limit, page);
};
