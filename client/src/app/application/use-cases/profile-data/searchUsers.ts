import { ISearchByValue } from '@/app/domain/types/boards-interface';
import { IUsersProfileCard } from '@/app/domain/types/data-users';
import { searchUsersAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const searchUsersCase = async ({
  page,
  limit,
  value,
}: ISearchByValue): Promise<IUsersProfileCard | null> => {
  return await searchUsersAdapter({ page, limit, value });
};
