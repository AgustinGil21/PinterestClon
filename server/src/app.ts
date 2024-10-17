import express, { json } from 'express';
import { BASE_URL, PORT } from './config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import AuthRoutes from './routes/auth.routes.js';
import CountriesRoutes from './routes/countries.routes.js';
import GenderRoutes from './routes/genders.routes.js';
import LanguagesRoutes from './routes/languages.routes.js';
import EditProfileRoutes from './routes/edit-profile.routes.js';
import AvatarRoutes from './routes/avatar.routes.js';
import UserHomeDataRoute from './routes/user-home-data.routes.js';
import AccountManagementRoutes from './routes/account-management.routes.js';
import ProfileVisibilityRoutes from './routes/profile-visibility.routes.js';
import AccountSecurityRoutes from './routes/account-security.routes.js';
import PinsRoutes from './routes/pins.routes.js';
import CategoriesRoutes from './routes/categories.routes.js';
import UsersRoutes from './routes/users.routes.js';
import BoardsRoutes from './routes/boards.routes.js';
import { logger } from './utils/logger.js';

export const app = express();

app.use(json({ limit: '50mb' }));
app.use(cookieParser());
app.disable('x-powered-by');
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

const SETTINGS_BASE_URL = `${BASE_URL}/settings`;

app.use(`${BASE_URL}`, UserHomeDataRoute);
app.use(`${BASE_URL}/auth`, AuthRoutes);
app.use(`${BASE_URL}/countries`, CountriesRoutes);
app.use(`${BASE_URL}/genders`, GenderRoutes);
app.use(`${BASE_URL}/languages`, LanguagesRoutes);
app.use(`${BASE_URL}/avatar`, AvatarRoutes);
app.use(`${SETTINGS_BASE_URL}/edit-profile`, EditProfileRoutes);
app.use(`${SETTINGS_BASE_URL}/account-management`, AccountManagementRoutes);
app.use(`${SETTINGS_BASE_URL}/profile-visibility`, ProfileVisibilityRoutes);
app.use(`${SETTINGS_BASE_URL}/account-security`, AccountSecurityRoutes);
app.use(`${BASE_URL}/pins`, PinsRoutes);
app.use(`${BASE_URL}/categories`, CategoriesRoutes);
app.use(`${BASE_URL}/users`, UsersRoutes);
app.use(`${BASE_URL}/boards`, BoardsRoutes);

app.listen(PORT, () => {
  logger.info(`server running on url http://localhost:${PORT}`);
});
