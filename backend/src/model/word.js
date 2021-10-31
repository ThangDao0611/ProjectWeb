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
    }
})

export const Word = mongoose.model('Word',dataSchema,'datas');