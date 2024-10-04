import { Router } from 'express';
import ProfileVisibilityController from '../controllers/profile-visibility.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, ProfileVisibilityController.getData);

router.patch(
  '/convert-account',
  authRequired,
  ProfileVisibilityController.convertAccount
);

router.patch(
  '/private-account',
  authRequired,
  ProfileVisibilityController.privateProfile
);

export default router;
