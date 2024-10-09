import { Router } from 'express';
import EditProfileController from '../controllers/edit-profile.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
const router = Router();
router.get('/', authRequired, EditProfileController.getPublicData);
router.put('/', authRequired, EditProfileController.changePublicData);
export default router;
