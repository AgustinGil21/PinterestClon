import { patchAccountManagementPasswordAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserPatchPasswordAccountManagement } from '@/app/domain/types';

export const patchAccountManagementCase = async (
  data: UserPatchPasswordAccountManagement
) => {
  await patchAccountManagementPasswordAdapter(data);
};
