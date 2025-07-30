import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  createContent,
  likeContent,
  addComment,
  saveContent,
  getContent,
  getAllcontent
} from '../controllers/content.controllers.js';

const router = express.Router();

router.route('/').get(getAllcontent).post(protect, createContent);

router.route('/:id').get(getContent);

router.post('/:id/like', protect, likeContent);
router.post('/:id/save', protect, saveContent);
router.post('/:id/comments', protect, addComment);

export default router;