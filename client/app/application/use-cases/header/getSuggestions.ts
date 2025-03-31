import { SuggestionsInterface } from '../../../domain/types/pins-structure';
import { getSuggestionsAdapter } from '../../../infrastructure/adapters/PinsAdapter';

export const getSuggestionsCase = async (): Promise<
  SuggestionsInterface[] | []
> => {
  return await getSuggestionsAdapter();
};
