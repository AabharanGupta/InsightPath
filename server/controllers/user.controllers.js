import User from "../models/user.model.js";
import Content from "../models/content.model.js";
import Comment from "../models/comment.model.js";

export const getSavedContent=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id).populate('savedContent');
        res.json(user.savedContent);
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
        console.log(`Error in getting saved content ${error}`);
    }
};

export const getLikedContent=async(req,res)=>{
    try{
        const likedContent=await Content.find({likes:req.user._id});
        res.json(likedContent);
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
        console.log(`Error in getting liked content: ${error}`);
    }
};

export const getCommentedContent=async(req,res)=>{
    try{
        const commentedContentIds =await Comment.distinct('content',{author:req.user._id});             //since multiple comments on same content are possible
        const commentedContent=await Content.find({_id:{$in:commentedContentIds}});
        res.send(commentedContent);
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
        console.log(`Error in getting commented content:${error}`);
    }
};