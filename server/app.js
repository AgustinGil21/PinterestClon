import express, { json } from 'express';
import cors from 'cors';
import corsMiddleware from './middlewares/cors.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import AuthRoutes from './routes/auth.routes.js';

const PORT = process.env.PORT ?? 3000;
const BASE_URL = '/pinterestclon-api';

export const app = express();

app.use(json());
app.use(cookieParser());
app.use(corsMiddleware());
app.disable('x-powered-by');

app.use(`${BASE_URL}/auth`, AuthRoutes);

app.listen(PORT, () => {
  console.log(`server running on url: http://localhost:${PORT}`);
});
