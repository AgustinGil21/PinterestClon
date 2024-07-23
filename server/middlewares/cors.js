import cors from 'cors';
import { ACCEPTED_ORIGINS } from '../config.js';

export const corsMiddleware = () => {
  return cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) callback(null, true);

      return callback(new Error('Not allowed by CORS'));
    },
  });
};
