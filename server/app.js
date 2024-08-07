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
import UserDataRoute from './routes/user-data.routes.js';

export const app = express();

app.use(json());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(cors());

app.use(`${BASE_URL}`, UserDataRoute);
app.use(`${BASE_URL}/auth`, AuthRoutes);
app.use(`${BASE_URL}/countries`, CountriesRoutes);
app.use(`${BASE_URL}/genders`, GenderRoutes);
app.use(`${BASE_URL}/languages`, LanguagesRoutes);
app.use(`${BASE_URL}/setting/edit-profile`, EditProfileRoutes);
app.use(`${BASE_URL}/avatar`, AvatarRoutes);
// app.use(`${BASE_URL}/setting/account-settings`);
// app.use(`${BASE_URL}/setting/profile-visibility`);
// app.use(`${BASE_URL}/settings/security`);
// app.use(`${BASE_URL}/pins`); ==> home page y single pin (id)
// app.use(`${BASE_URL}/:username`); ==> user page, boards, created pins, etc
// app.use(`${BASE_URL}/boards`); ==> user boards
// app.use(`${BASE_URL}/created-pins`); ==> user pins

app.listen(PORT, () => {
  console.log(`server running on url: http://localhost:${PORT}`);
});
