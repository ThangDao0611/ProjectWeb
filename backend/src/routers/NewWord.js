import express from "express";
import {NewWord} from "../model/new_word";
import auth from "../middleware/auth";
const routerNew = express.Router();

routerNew.post('/api/add-word',auth,async (req,res)=>{
    try {
        const word = new NewWord(req.body);
        await word.save();
        return res.status(200).send({message:"Add Done"});
    } catch (error) {
        console.log(error);
        return res.status(400).send({message: error});
    }
});

routerNew.get('/api/get-list-new-words',async (req,res)=>{
    try {
        const query = NewWord.find().sort({ _id: -1 }).limit(10).select(['-createBy','-flag']);
        query.exec(async (err, list)=>{
            if (err) return console.error(err);
            return res.status(200).send({ list: list });
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({message: error});
    }
})

routerNew.get('/api/my-new-words',auth,async (req,res)=>{
    try {
        const query = NewWord.find({createBy: req.user._id}).select(['-createBy','-flag']);
        query.exec(async (err, list)=>{
            if (err) return console.error(err);
            return res.status(200).send({ list: list });
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({message: error});
    }
})

routerNew.post('/api/delete-new-word',auth,async (req,res)=>{
    try{
        const query = NewWord.findOne({_id: req.body._id,createBy: req.user._id});
        query.exec(async(err,word)=>{
            if (err) return console.error(err);
            word.flag = 1;
            await word.save();
            return res.status(200).send({ message: "Removed" });
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({message: err});
    }
})

export default routerNew;