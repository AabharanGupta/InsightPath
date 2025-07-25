import Content from "../models/content.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

export const createContent= async(req,res)=>{
    const {title,description,url}=req.body;

    if(!title||!description){
        res.status(400).json({message:"Kindly input both the title and description"});
    }
    try{
       const orConditions = [];
        if (title) orConditions.push({ title });
        if (description) orConditions.push({ description });
        if (url) orConditions.push({ url });

        if (orConditions.length > 0) {
        const existingContent = await Content.findOne({ $or: orConditions });
        if (existingContent) {
            return res.status(409).json({ message: 'This content already exists.' });
        }
        }

        const content = new Content({
        title,
        description,
        url,
        author: req.user._id,
        });

        const createdContent = await content.save();
        res.status(201).json(createdContent);

    }
    catch(error){
        console.log(`Error in creation:${error}`);
        res.status(500).json({message:"Server Error"});
    }
};
export const getContent=async(req,res)=>{
    res.send('Get single content');
}

export const likeContent=async(req,res)=>{
    res.send('Like the content');
}

export const saveContent=async(req,res)=>{
    res.send('Save the content');
}

export const addComment=async(req,res)=>{
    res.send('Add comment');
}
