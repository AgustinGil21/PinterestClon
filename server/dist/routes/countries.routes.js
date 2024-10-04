import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import CountriesController from '../controllers/countries.controller.js';
const router = Router();
router.get('/', CountriesController.getCountries);
router.get('/:id', authRequired, CountriesController.getCountryByID);
export default router;
