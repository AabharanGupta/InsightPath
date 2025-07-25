import {Schema,model} from 'mongoose';
const todoSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    text:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
        default:false,
    },
},{
    timestamps:true
});

const Todo=model("Todo",todoSchema);
export default Todo;