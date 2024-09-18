import { Router } from 'express';
import BoardsController from '../controllers/boards.controller.js';

const router = Router();

router.get('/search', BoardsController.searchBoards);

export default router;
