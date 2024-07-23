import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.logIn);
router.post('/logout', authRequired, AuthController.logOut);

export default router;
