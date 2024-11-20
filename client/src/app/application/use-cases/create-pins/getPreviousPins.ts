import { PreviousPin } from '@/app/domain/types/pins-structure';
import { getPreviousPinsAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getPreviousPinsCase = async (): Promise<PreviousPin[]> => {
  return await getPreviousPinsAdapter();
};
