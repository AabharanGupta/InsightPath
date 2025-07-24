import {Schema,mongoose} from 'mongoose';

const contentSchema=new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    url:{
        type: String,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
},{
    timestamps:true,
});

const Content=model("Content",contentSchema)
export default Content;