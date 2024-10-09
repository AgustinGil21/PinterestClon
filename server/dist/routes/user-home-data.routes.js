import { Router } from 'express';
import UserHomeDataController from '../controllers/user-home-data.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
const router = Router();
router.get('/', authRequired, UserHomeDataController.getData);
router.get('/followers-&-following-count', authRequired, UserHomeDataController.getFollowersAndFollowingCount);
export default router;
