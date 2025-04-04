import { Router } from 'express';
import CategoriesController from '../controllers/categories.controller.js';

const router = Router();

router.get('/', CategoriesController.getCategories);
router.get('/search', CategoriesController.searchByCategoryByName);
router.get('/:id', CategoriesController.searchByID);

export default router;
