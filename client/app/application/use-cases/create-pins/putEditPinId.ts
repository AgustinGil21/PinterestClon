import { PinEdit } from '../../../domain/types/pins-structure';
import { putPinEditIdAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const putPinEditIdCase = async (id: string, data: PinEdit) => {
  await putPinEditIdAdapter(id, data);
};
