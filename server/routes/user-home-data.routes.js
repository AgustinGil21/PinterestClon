import { Router } from 'express';
import UserHomeDataController from '../controllers/user-home-data.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, UserHomeDataController.getData);

export default router;
