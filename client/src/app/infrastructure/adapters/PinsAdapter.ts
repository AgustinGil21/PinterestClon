import { PinCreate } from '@/app/domain/types/pins-structure';
import { servicePostCreatePin } from '../services/service-pins';

export const postCreatePinAdapter = async (data: PinCreate): Promise<void> => {
  await servicePostCreatePin(data);
};
