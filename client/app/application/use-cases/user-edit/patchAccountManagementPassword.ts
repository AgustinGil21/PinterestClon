import { patchAccountManagementPasswordAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserPatchPasswordAccountManagement } from '../../../domain/types';

export const patchAccountManagementCase = async (
  data: UserPatchPasswordAccountManagement
) => {
  await patchAccountManagementPasswordAdapter(data);
};
