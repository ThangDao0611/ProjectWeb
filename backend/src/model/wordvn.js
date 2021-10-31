import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    word:{
        type: String,
        required: true,
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
    examplesEn:{
            type:[String],
            trim: true
    }
})

export const WordVn = mongoose.model('WordVn',dataSchema,'datavns');