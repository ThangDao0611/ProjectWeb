import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    word:{
        type: String,
        required: true,
        trim: true
    },
    spell:{
        type:String,
        trim: true
    },
    wType :{
        type: [String],
        trim: true
    },
    means:{
        type:[String],
        trim: true
    },
    examples:{
            type:[String],
            trim: true
    },
    examplesVn:{
            type:[String],
            trim: true
    },
    flag:{
        type: Number,
        required: true
    },
    createBy:{
        type:String,
        trim: true,
        require: true
    }
})

export const NewWord = mongoose.model('NewWord',dataSchema);