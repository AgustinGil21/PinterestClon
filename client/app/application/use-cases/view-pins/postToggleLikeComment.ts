import { postToggleLikeCommentAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const postToggleLikeCommentCase = async (id: string) => {
  return await postToggleLikeCommentAdapter(id);
};
