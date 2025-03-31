import { postCommentCreateAdapter } from '../../../infrastructure/adapters/PinsAdapter';
import { PostCommentInterface } from '../../../domain/types/pins-structure';

export const postCommentCreateCase = async (data: PostCommentInterface) => {
  const response = await postCommentCreateAdapter(data);
  return response;
};
