import { putUserAccountManagementAdapter } from '../../../infrastructure/adapters/UserAdapter';
import { UserPutAccountManagement } from '../../../domain/types';

export const putUserAccountManagementCase = async (
  data: UserPutAccountManagement
) => {
  await putUserAccountManagementAdapter(data);
  window.location.reload();
};
