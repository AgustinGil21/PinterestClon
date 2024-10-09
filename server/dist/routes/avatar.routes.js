import { Router } from 'express';
import AvatarController from '../controllers/avatar.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
const router = Router();
router.post('/', authRequired, AvatarController.newAvatar);
router.delete('/', authRequired, AvatarController.deleteAvatar);
export default router;
