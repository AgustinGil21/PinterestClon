import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const PORT = process.env.PORT ?? 3000;

export const app = express();

app.use(json());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running on url: http://localhost:${PORT}`);
});
