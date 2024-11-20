import { PinEdit } from '@/app/domain/types/pins-structure';
import { putPinEditIdAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const putPinEditIdCase = async (id: string, data: PinEdit) => {
  await putPinEditIdAdapter(id, data);
};
