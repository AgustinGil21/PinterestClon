import { deletePreviousPinAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const deletePreviousPinCase = async (id: string) => {
  await deletePreviousPinAdapter(id);
  window.location.reload();
};
