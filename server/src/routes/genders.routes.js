import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import GendersController from '../controllers/genders.controller.js';

const router = Router();

router.get('/', GendersController.getGenders);
router.get('/:id', authRequired, GendersController.getGenderByID);

export default router;
