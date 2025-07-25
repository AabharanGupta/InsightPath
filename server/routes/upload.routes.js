import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { uploadFile } from '../controllers/file.controllers.js';
import upload  from '../middleware/upload.middleware.js';

const router=express.Router();

router.route('/').post(protect,upload.single('file'),uploadFile);

export default router;