import { servicePostDeleteComment } from '@/app/infrastructure/services/service-pins';

export const postDeleteCommentCase = async (id: string) => {
  return await servicePostDeleteComment(id);
};
