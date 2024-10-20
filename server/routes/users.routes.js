import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = Router();

router.get('/search', UsersController.searchUsers);
router.get('/profile/', authRequired, UsersController.getUserOwnerProfile);
router.get(
  '/profile/:username',
  isAuthenticated,
  UsersController.getUserProfile
);
router.post('/follow/:id', authRequired, UsersController.toggleFollowUser);
router.get(
  '/followers-list/:username',
  isAuthenticated,
  UsersController.userFollowers
);

router.get(
  '/following-accounts-list/:username',
  isAuthenticated,
  UsersController.userFollowingAccounts
);

export default router;
