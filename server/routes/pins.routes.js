import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import PinsController from '../controllers/pins.controller.js';

const router = Router();

router.get('/previous-pins', authRequired, PinsController.getPreviousPins);
router.get(
  '/previous-pins/:id',
  authRequired,
  PinsController.getPreviousPinsFullData
);
router.get(
  '/created/:username',
  isAuthenticated,
  PinsController.getCreatedPins
);
router.get('/saved/:username', isAuthenticated, PinsController.getSavedPins);
router.get('/search', isAuthenticated, PinsController.searchPins);
router.get(
  '/search-by-category',
  isAuthenticated,
  PinsController.searchByCategory
);
router.get('/search/suggestions', PinsController.searchAutocompleteSuggestions);
router.get('/:id', isAuthenticated, PinsController.getSinglePin);
router.get(
  '/similar-pins/:id',
  isAuthenticated,
  PinsController.youMightAlsoLike
);
router.get('/', isAuthenticated, PinsController.getHomePins);
router.post('/like/:id', authRequired, PinsController.toggleLikePin);
router.post('/create', authRequired, PinsController.createPin);
router.delete('/:id', authRequired, PinsController.deletePin);
router.put('/:id', authRequired, PinsController.editPin);

export default router;
