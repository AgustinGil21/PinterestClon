import { Router } from 'express';
import AvatarController from '../controllers/avatar.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { imgUploader } from '../middlewares/upload.js';

const router = Router();

router.post(
  '/',
  authRequired,
  imgUploader.single('image'),
  AvatarController.newAvatar
);
router.delete('/', authRequired, AvatarController.deleteAvatar);

export default router;
