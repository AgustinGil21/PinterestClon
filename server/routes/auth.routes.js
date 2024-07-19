import { Router } from 'express';
import { app } from '../app.js';
import AuthController from '../controllers/auth.controller.js';

const router = Router();

app.post('/register', AuthController.register);
app.post('/login', AuthController.logIn);
app.post('/logout', AuthController.logOut);
app.post('/recover-account', AuthController.recoverAccount);

export default router;
