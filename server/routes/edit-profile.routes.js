import { Router } from 'express';
import EditProfileController from '../controllers/edit-profile.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { imgUploader } from '../middlewares/upload.js';

const router = Router();

// Porque usar PUT en vez de PATCH? Ya que
// permite que si no hay contenido entonces
// se agregue (como POST) pero de haberlo,
// simplemente lo modificará (como PATCH).

router.get('/', authRequired, EditProfileController.getPublicData);
router.put(
  '/avatar',
  authRequired,
  imgUploader.single('file'),
  EditProfileController.avatar
);
router.put(
  '/public-data',
  authRequired,
  EditProfileController.changePublicData
);

export default router;
