import { putUserPublicDataAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserPublicDataExtraInfo } from '@/app/domain/types';

export const putUserPublicDataCase = async (data: UserPublicDataExtraInfo) => {
  await putUserPublicDataAdapter(data);
};
