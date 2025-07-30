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
export const getAllcontent=async(req,res)=>{
    try{
        const content=await Content.find({}).populate('author','name');
        res.json(content);
    }
    catch(error){
        res.status(500).json({message:`Server Error`})
    }
}

export const getContent=async(req,res)=>{
    try{
        const content=await Content.findById(req.params.id).populate('author','name');
        if(!content){
            return res.status(404).json({message:`Not Found`});
        }
        const comments=await Comment.find({content:req.params.id}).populate('author','name');
        res.json({content,comments});
    }
    catch(error){
        res.status(500).json({message:`Server Error`});
        console.log(`Error in get content:${error}`);
    }
}

export const likeContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    const index = content.likes.indexOf(req.user.id);

    if (index === -1) {
      content.likes.push(req.user.id);
    } else {
      content.likes.splice(index, 1);
    }

    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const saveContent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const index = user.savedContent.indexOf(content._id);
    if (index === -1) {
      user.savedContent.push(content._id);
    } else {
      user.savedContent.splice(index, 1);
    }

    await user.save();
    res.json({ message: 'Content save status updated.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addComment = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const comment = new Comment({
      text,
      author: req.user.id,
      content: req.params.id,
    });

    const createdComment = await comment.save();
    const populatedComment = await Comment.findById(createdComment._id).populate('author', 'name');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
