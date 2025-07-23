import mongoose, {Schema,model} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:false,                 // Since we can miss this for OAuth users
    },
    googleID:{
        type:String,
        unique:true,
        sparse:true,                    //multiple null values possible                     
    },
},
{
    timestamps:true,
})

export const User=mongoose.model("User",userSchema);