import {Schema,model} from 'mongoose';

const answerSchema=new Schema(
    {
        text:{
            type:String,
            required:true,
        },
        author:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        question:{
            type:Schema.Types.ObjectId,
            ref:'Question',
            required:true,
        }
    },
    {
        timestamps:true
    }
);

const Answer=model('Answer',answerSchema);
export default Answer;