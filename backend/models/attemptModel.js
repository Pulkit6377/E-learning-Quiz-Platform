import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
    quizId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"quiz",
        required:true
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    answers:{
        type: Map,
        of:Number,
        required:true
    },
    score:{
        type:Number
    }
});


export default mongoose.model("attempt",attemptSchema)