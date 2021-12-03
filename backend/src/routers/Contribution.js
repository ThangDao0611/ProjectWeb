import express from "express";
import {Contribution} from "../model/contribution";
import auth from "../middleware/auth";
const routerCon = express.Router();

routerCon.post("/api/add-contribution",auth,async (req, res)=>{
    let data = {
        user_id:req.user._id,
        word_id:req.body.word_id,
        type:req.body.type,
        content:req.body.content,
        flag:0,
        content_mean:req.body.content_mean,
        day: new Date()
    };
    try {
        const contribution = new Contribution(data);
        await contribution.save();
        return res.status(200).send({message:"Add Done"});
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({message: err});
    }
})

routerCon.get("/api/get-contribution",async (req, res)=>{
    let word_id = req.query.word_id;
    let type = req.query.type;
    try {
        const query = Contribution.find({word_id: word_id,type: type,flag:0});
        query.exec(async(err,list)=>{
            if (err) return console.error(err);
            return res.status(200).send({ list: list });
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({message: err});
    }
})

routerCon.get("/api/get-my-contribution",auth,async (req, res)=>{
    let word_id = req.query.word_id;
    let type = req.query.type;
    let user_id = req.user._id;
    try {
        const query = Contribution.find({word_id: word_id,type: type,user_id:user_id,flag:0});
        query.exec(async(err,list)=>{
            if (err) return console.error(err);
            return res.status(200).send({ list: list });
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({message: err});
    }
})

routerCon.post("/api/remove-contribution",auth,async (req,res)=>{
    let word_id = req.body.word_id;
    let type = req.body.type;
    let user_id = req.user._id;
    try {
        const query = Contribution.findOne({word_id: word_id,type: type,user_id: user_id});
        query.exec(async(err,con)=>{
            if (err) return console.error(err);
            con.flag = 1;
            await con.save();
            return res.status(200).send({ message: "Removed" });
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({message: err});
    }
})

routerCon.post("/api/update-contribution",auth,async (req, res)=>{
    let word_id = req.body.word_id;
    let type = req.body.type;
    let user_id = req.user._id;
    try{
        const query = Contribution.findOne({word_id: word_id,type: type,user_id: user_id});
        query.exec(async(err,con)=>{
            if (err) return console.error(err);
            con.content = req.body.content;
            con.content_mean = req.body.content_mean;
            await con.save();
            return res.status(200).send({ message: "Updated" });
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({message: err});
    }
})

export default routerCon;