import { savePinToProfileAdapter } from '@/app/infrastructure/adapters/ProfilesDataAdapter';

export const savePinToProfileUseCase = async (id: string) =>
  await savePinToProfileAdapter(id);
