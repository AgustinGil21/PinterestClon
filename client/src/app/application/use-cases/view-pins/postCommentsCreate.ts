import { postCommentCreateAdapter } from '@/app/infrastructure/adapters/PinsAdapter';
import { PostCommentInterface } from '@/app/domain/types/pins-structure';

export const postCommentCreateCase = async (data: PostCommentInterface) => {
  const response = await postCommentCreateAdapter(data);
  return response;
};
