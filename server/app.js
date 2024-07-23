import express, { json } from 'express';
import { BASE_URL, PORT } from './config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import AuthRoutes from './routes/auth.routes.js';

// const PORT = process.env.PORT ?? 3000;

export const app = express();

app.use(json());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(cors());

app.use(`${BASE_URL}/auth`, AuthRoutes);

app.listen(PORT, () => {
  console.log(`server running on url: http://localhost:${PORT}`);
});
