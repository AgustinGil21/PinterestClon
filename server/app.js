import express, { json } from 'express';
import { BASE_URL, PORT } from './config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
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

export const app = express();

const safeFileNamesRegex = /^[a-zA-Z0-9_\-!@#\$%\^&\*\(\)]+(\.png|\.jpg)$/;
const tempFileDirStr = './uploads';

app.use(json({ limit: '50mb' }));
app.use(cookieParser());
app.disable('x-powered-by');
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempFileDirStr,
    safeFileNames: safeFileNamesRegex,
    preserveExtension: true,
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
// app.use(`${BASE_URL}/pins`); ==> home page y single pin (id)
// app.use(`${BASE_URL}/:username`); ==> user page, boards, created pins, etc
// app.use(`${BASE_URL}/boards`); ==> user boards
// app.use(`${BASE_URL}/created-pins`); ==> user pins

app.listen(PORT, () => {
  console.log(`server running on url: http://localhost:${PORT}`);
});
