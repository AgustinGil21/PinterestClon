import { putUserAccountManagementAdapter } from '@/app/infrastructure/adapters/UserAdapter';
import { UserPutAccountManagement } from '@/app/domain/types';

export const putUserAccountManagementCase = async (
  data: UserPutAccountManagement
) => {
  await putUserAccountManagementAdapter(data);
  window.location.reload();
};
