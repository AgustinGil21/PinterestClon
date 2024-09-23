import { PinCreate } from '@/app/domain/types/pins-structure';
import { postCreatePinAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const postCreatePinsCase = async (data: PinCreate): Promise<void> => {
  await postCreatePinAdapter(data);
  // window.location.reload();
};
