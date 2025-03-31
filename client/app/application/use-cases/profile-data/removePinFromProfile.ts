import { removePinFromProfileAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const removePinFromProfileUseCase = async (id: string) =>
  await removePinFromProfileAdapter(id);
