import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import LanguagesController from '../controllers/languages.controller.js';

const router = Router();

router.get('/', LanguagesController.getLanguages);
router.get('/:id', authRequired, LanguagesController.getLanguageByID);

export default router;
