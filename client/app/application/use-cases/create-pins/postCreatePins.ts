import { PinCreate } from '../../../domain/types/pins-structure';
import { postCreatePinAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const postCreatePinsCase = async (data: PinCreate): Promise<void> => {
  console.log(data);
  await postCreatePinAdapter(data);
};
