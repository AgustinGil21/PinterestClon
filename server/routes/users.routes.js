import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = Router();

router.get('/search/:value', isAuthenticated, UsersController.searchUsers);
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
  '/following-list/:username',
  isAuthenticated,
  UsersController.userFollowingAccounts
);
router.post('/save-pin', authRequired, UsersController.savePin);
router.post('/remove-pin', authRequired, UsersController.removePin);
// router.get('/saved-pins/:username', isAuthenticated, UsersController.savedPins);

export default router;
