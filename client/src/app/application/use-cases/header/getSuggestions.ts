import { SuggestionsInterface } from '@/app/domain/types/pins-structure';
import { getSuggestionsAdapter } from '@/app/infrastructure/adapters/PinsAdapter';

export const getSuggestionsCase = async (): Promise<
  SuggestionsInterface[] | []
> => {
  return await getSuggestionsAdapter();
};
