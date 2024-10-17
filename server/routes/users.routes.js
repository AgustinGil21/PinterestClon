import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/search', UsersController.searchUsers);
router.get('/profile/', authRequired, UsersController.getUserById);
router.get(
  '/profile/:username',
  authRequired,
  UsersController.getUserByUsernameAndId
);
router.get('/profile/not-logged/:username', UsersController.getUserByUsername);
router.post('/follow', authRequired, UsersController.toggleFollowUser);
router.get(
  '/followers-list/:username',
  authRequired,
  UsersController.userFollowers
);
router.get(
  '/followers-list/not-logged/:username',
  UsersController.userFollowersNotLogged
);
router.get(
  '/following-accounts-list/:username',
  authRequired,
  UsersController.userFollowingAccounts
);
router.get(
  '/following-accounts-list/not-logged/:username',
  authRequired,
  UsersController.userFollowingAccountsNotLogged
);

export default router;
