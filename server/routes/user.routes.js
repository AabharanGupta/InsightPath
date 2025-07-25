import express from 'express';
import  {getSavedContent,getLikedContent,getCommentedContent} from '../controllers/user.controllers.js';
import { protect } from '../middleware/auth.middleware.js';

const router=express.Router();

router.get('/profile/saved',protect,getSavedContent);
router.get('/profile/liked',protect,getLikedContent);
router.get('/profile/commented',protect,getCommentedContent);

export default router