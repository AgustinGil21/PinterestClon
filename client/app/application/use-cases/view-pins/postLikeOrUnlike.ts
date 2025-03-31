import { postLikeOrUnlikePinAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const postLikeOrUnlikeCase = async (id: string) => {
  return await postLikeOrUnlikePinAdapter(id);
};
