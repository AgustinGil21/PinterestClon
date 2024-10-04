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

export default router;
