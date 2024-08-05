import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/email-address', AuthController.checkIfEmailAlreadyExists);
router.post('/register', AuthController.register);
router.post('/login', AuthController.logIn);
router.post('/logout', authRequired, AuthController.logOut);
router.post('/recover-account', AuthController.recoverAccount);
router.patch('/reset-password/:emailAddress', AuthController.resetPassword);

export default router;
