import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    timeLimit:{
        type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    isPublished:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("quiz",quizSchema)