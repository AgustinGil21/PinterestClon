import { CommentsResponseInterface } from '../../../domain/types/pins-structure';
import { getPinCommentsAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getPinCommentsCase = async (
  id: string,
  limit: number,
  page: number
): Promise<CommentsResponseInterface | null> => {
  return await getPinCommentsAdapter(id, limit, page);
};
