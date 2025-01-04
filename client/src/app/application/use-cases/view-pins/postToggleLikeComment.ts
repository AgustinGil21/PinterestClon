import { postToggleLikeCommentAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const postToggleLikeCommentCase = async (id: string) => {
  return await postToggleLikeCommentAdapter(id);
};
