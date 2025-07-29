import express from 'express';
import {protect} from '../middleware/auth.middleware.js'
import {createContent,likeContent,addComment,saveContent,getContent,getAllcontent} from '../controllers/content.controllers.js'

const router=express.Router();

router.route('/').get(getAllcontent).post(protect,createContent);

router.route('/:id').get(getContent);
router.route('/:id').post(protect,likeContent);
router.route('/:id').post(protect,addComment);
router.route('/:id').post(protect,saveContent);

export default router;