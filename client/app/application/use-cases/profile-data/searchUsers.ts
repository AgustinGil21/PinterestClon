import { ISearchByValue } from '../../../domain/types/boards-interface';
import { IUsersProfileCard } from '../../../domain/types/data-users';
import { searchUsersAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const searchUsersCase = async ({
  page,
  limit,
  value,
}: ISearchByValue): Promise<IUsersProfileCard | null> => {
  return await searchUsersAdapter({ page, limit, value });
};
