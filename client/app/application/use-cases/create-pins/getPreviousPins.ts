import { PreviousPin } from '../../../domain/types/pins-structure';
import { getPreviousPinsAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getPreviousPinsCase = async (): Promise<PreviousPin[]> => {
  return await getPreviousPinsAdapter();
};
