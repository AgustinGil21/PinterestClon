import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import AccountSecurityController from '../controllers/account-security.controller.js';
const router = Router();
router.get('/', authRequired, AccountSecurityController.getData);
router.patch('/2fa', authRequired, AccountSecurityController.toggleTwoFactorAuthenticationMode);
export default router;
