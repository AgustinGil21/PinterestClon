import { postAvatarUser } from '@/app/infrastructure/adapters/UserAdapter';
import { AvatarData } from '../../domain/types';

export const updateUserAvatar = async (data: AvatarData): Promise<void> => {
  await postAvatarUser(data);
};
