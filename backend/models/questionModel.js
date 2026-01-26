import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quiz',
        required:true
    },
    questionText:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        required:true
    },
    correctOptionIndex:{
        type:Number,
        required:true
    }
})

export default mongoose.model("question",questionSchema)