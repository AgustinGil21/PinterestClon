import { Router } from 'express';
import BoardsController from '../controllers/boards.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = Router();

router.get('/search', BoardsController.searchBoards);
router.get('/', BoardsController.getBoards);
router.get('/last-board', authRequired, BoardsController.getLastUsedBoardName);
router.get('/covers/:id', authRequired, BoardsController.getPossibleCovers);
router.get('/:id', isAuthenticated, BoardsController.getSingleBoard);
router.get('/:username', isAuthenticated, BoardsController.getUserBoards);
router.get('/boards-list', authRequired, BoardsController.getCreatedBoardsList);
router.post('/create', authRequired, BoardsController.createBoard);
router.put('/edit', authRequired, BoardsController.editBoard);
router.delete('/delete/:id', authRequired, BoardsController.deleteBoard);
router.post('/add-pin', authRequired, BoardsController.addPinToBoard);
router.post('/remove-pin', authRequired, BoardsController.removePinFromBoard);

export default router;
