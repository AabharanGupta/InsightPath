import {model,Schema} from 'mongoose';

const commentSchema=new Schema({
    text:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    content:{
        type:Schema.Types.ObjectId,
        ref:'Content',
        required:true
    },
},{
    timestamps:true
});

const Comment=model("Comment",commentSchema);
export default Comment;