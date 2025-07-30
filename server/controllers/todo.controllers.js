import Todo from "../models/todo.model.js";

export const getTodos=async(req,res)=>{
    const todos=await Todo.find({user:req.user._id});
    res.json(todos);
};

export const createTodo=async(req,res)=>{
    const {text}=req.body;
    if(!text){
        res.status(400).json({message:"Kindly input a text in todo"});
    }
    const todo=new Todo({
        text,
        user:req.user._id,
    });
    const createdTodo=await todo.save();
    res.status(201).json(createdTodo);
};

export const updateTodo=async(req,res)=>{
    const todo=await Todo.findById(req.params.id);
    if(!todo){
        return res.status(404).json({message:"The page were looking for is not valid"});
    }
    if(todo.user.toString()!=req.user.id){
        res.status(401).json({message:"You are not authorized" });
    }
    todo.text=req.body.todo||todo.text;
    todo.completed=req.body.completed !=undefined?req.body.completed:todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
};

export const deleteTodo=async(req,res)=>{
    const todo=await Todo.findById(req.params.id);
    if(!todo){
        return res.status(404).json({message:"The page were looking for is not valid"});
    }
    if(todo.user.toString()!=req.user.id){
        res.status(401).json({message:"You are not authorized" });
    }
    await todo.deleteOne();
    res.json({message:'To do has been successfully removed'});
};