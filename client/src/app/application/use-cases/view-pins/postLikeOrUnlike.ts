import { postLikeOrUnlikePinAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const postLikeOrUnlikeCase = async (id: string) => {
  return await postLikeOrUnlikePinAdapter(id);
};
