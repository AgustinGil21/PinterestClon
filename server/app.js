import express, { json } from 'express';
import { BASE_URL, PORT } from './config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import AuthRoutes from './routes/auth.routes.js';
import CountriesRoutes from './routes/countries.routes.js';
import GenderRoutes from './routes/genders.routes.js';
import LanguagesRoutes from './routes/languages.routes.js';

export const app = express();

app.use(json());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(cors());

app.use(`${BASE_URL}/auth`, AuthRoutes);
app.use(`${BASE_URL}/countries`, CountriesRoutes);
app.use(`${BASE_URL}/genders`, GenderRoutes);
app.use(`${BASE_URL}/languages`, LanguagesRoutes);
app.use(`${BASE_URL}/setting/edit-profile`);
app.use(`${BASE_URL}/setting/account-settings`);
app.use(`${BASE_URL}/setting/profile-visibility`);
app.use(`${BASE_URL}/settings/security`);

app.listen(PORT, () => {
  console.log(`server running on url: http://localhost:${PORT}`);
});
