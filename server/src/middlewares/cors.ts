import cors from 'cors';
// import { ACCEPTED_ORIGINS } from '../config.js';
import { AcceptedOrigins } from '../interfaces/config/config-interface.d.js';

export const corsMiddleware = () => {
  return cors({
    origin: (origin: string | undefined, callback) => {
      if (AcceptedOrigins.includes(origin || '')) {
        return callback(null, true);
      }

      if (!origin) callback(null, true);

      return callback(new Error('Not allowed by CORS'));
    },
  });
};
