import { savePinToProfileAdapter } from '../../../infrastructure/adapters/ProfilesDataAdapter';

export const savePinToProfileUseCase = async (id: string) =>
  await savePinToProfileAdapter(id);
