import { removePinFromProfileAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const removePinFromProfileUseCase = async (id: string) =>
  await removePinFromProfileAdapter(id);
