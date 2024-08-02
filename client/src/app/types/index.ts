import { userSchema } from '../schemas/validation-service-api';
import { z } from 'zod';

export type UserDataType = z.infer<typeof userSchema>;
