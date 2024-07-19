import cors from 'cors';
import 'dotenv/config';

export const corsMiddleware = () => {
  return cors({
    origin: (origin, callback) => {
      if (process.env.ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) callback(null, true);

      return callback(new Error('Not allowed by CORS'));
    },
  });
};

export default corsMiddleware;
