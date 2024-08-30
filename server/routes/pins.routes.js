import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import PinsController from '../controllers/pins-controller.js';

const router = Router();

router.get('/created/:username', PinsController.getCreatedPins);
router.get('/search', PinsController.searchPins);
router.get('/search/by-category', PinsController.searchByCategory);
router.get('/:id', PinsController.getSinglePin);
router.get('/', PinsController.getHomePins);
router.post('/create', authRequired, PinsController.createPin);
router.delete('/:id', authRequired, PinsController.deletePin);
router.put('/', authRequired, PinsController.editPin);

export default router;
