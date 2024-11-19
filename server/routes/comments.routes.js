import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import CommentsController from '../controllers/comments.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = Router();

router.post('/create', authRequired, CommentsController.createComment);
router.delete('/delete', authRequired, CommentsController.deleteComment);
router.post('/toggle-like', authRequired, CommentsController.toggleLikeComment);
router.get(
  '/pin-comments/:id',
  isAuthenticated,
  CommentsController.getPinComments
);

export default router;
