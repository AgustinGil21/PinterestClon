import { servicePostDeleteComment } from '../../../infrastructure/services/service-pins';

export const postDeleteCommentCase = async (id: string) => {
  return await servicePostDeleteComment(id);
};
