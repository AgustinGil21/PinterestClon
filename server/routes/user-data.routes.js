import { Router } from 'express';
import UserDataController from '../controllers/user-data.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, UserDataController.getData);

export default router;
