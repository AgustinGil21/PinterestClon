import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import AccountManagementController from '../controllers/account-management.controller.js';

const router = Router();

router.get('/', authRequired, AccountManagementController.getData);

router.put(
  '/personal-info',
  authRequired,
  AccountManagementController.changePersonalInfo
);

router.patch(
  '/change-password',
  authRequired,
  AccountManagementController.changePassword
);

router.post(
  '/new-password',
  authRequired,
  AccountManagementController.newPassword
);

router.delete(
  '/delete-account',
  authRequired,
  AccountManagementController.deleteAccount
);

router.patch(
  '/convert-account',
  authRequired,
  AccountManagementController.convertAccount
);

export default router;
