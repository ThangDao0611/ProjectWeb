import mongoose from "mongoose";

const contributionSchema = mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        trim: true
    },
    word_id:{
        type:String,
        required: true,
        trim: true
    },
    type :{
        type: String,
        trim: true
    },
    content :{
        type:String,
        required: true,
        trim: true
    },
    content_mean:{
        type:String,
        required: true,
        trim:true
    },
    flag:{ 
        type:Number, 
        required:true
    },
    day:{
        type:Date
    }
})

export const Contribution = mongoose.model('Contribute',contributionSchema);