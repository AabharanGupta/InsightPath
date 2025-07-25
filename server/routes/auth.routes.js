import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { registerUser,loginUser } from '../controllers/auth.controllers.js';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);

//oauth
router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',
    passport.authenticate('google',{failureRedirect:'/login'}),
    (req,res)=>{
        const token=jwt.sign({id:req.user._id},process.env.JWT_SECRET,{
            expiresIn:'90d',
        });
        res.redirect(`http://localhost:3000?token=${token}`)
    }
);


export default router;