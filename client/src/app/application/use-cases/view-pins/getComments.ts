import { CommentsResponseInterface } from '@/app/domain/types/pins-structure';
import { getPinCommentsAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getPinCommentsCase = async (
  id: string,
  limit: number,
  page: number
): Promise<CommentsResponseInterface | null> => {
  return await getPinCommentsAdapter(id, limit, page);
};
