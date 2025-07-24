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
    savedContent:[{
        type:Schema.Types.ObjectId,
        ref:'Content'
    }],
},
{
    timestamps:true,
})

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')||!this.password)
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User=mongoose.model("User",userSchema);
export default User;