import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'90d',
    });
};                                      // json web token for auth

export const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
        if(userExists)
                return res.status(400).json({message:'User Already Exists'});
        const user=await User({
            name,
            email,
            password
        }).save();
        if(user){
            res.status(201).json({
                id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
                message:'The user has been successfully registered',
            });
        }
        else{
            res.status(401).json({message:'Invalid User data'});
        }
    }
    catch(error){
        res.status(500).json({message:'Server Error'})
        console.log(error);
    }
};

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            });
        }
        else{
            res.status(401).json({message:'Incorrect email or password'});
        }
    }
    catch(error){
        res.status(500).json({message:'Server Error'});
        console.log(`error in logging:${error}`);
    }
};