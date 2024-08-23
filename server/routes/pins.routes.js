import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import PinsController from '../controllers/pins-controller.js';

const router = Router();

router.get('/created', authRequired, PinsController.getCreatedPins);
router.get('/:id', PinsController.getSinglePin);

export default router;
