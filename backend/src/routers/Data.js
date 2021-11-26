import express from "express";
import { Word } from "../model/word";
import { WordVn } from "../model/wordvn";
import Grammarbot from "grammarbot";

import * as credentials from '../../credential.json'; 
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({
    projectId:'integral-zephyr-327902',
    credentials:credentials
});

const router = express.Router();

router.get("/api/search-word", async (req, res) => {
    //search word
    let lang = req.body.lang;
    //console.log(req);
    if (lang == "en") {
        try {
            //if(req.body.word)
            const query = Word.findOne({ word: req.body.word });
            query.exec(async (err, word) => {
                if (err) return console.error(err);
                if (word == null) {
                    const [translation] = await translate.translate(req.body.word, 'vi');
                    console.log(translation);
                    return res.status(200).send({ word: translation, auto: true });
                }
                return res.status(200).send({ word: word });
            });
        } catch (err) {
            res.status(400).send({ message: err });
            console.log("Error:"+err);
        }
    } else {
        try {
            const query = WordVn.findOne({ word: req.body.word });
            query.exec(async (err, word) => {
                if (err) return console.error(err);
                if (word == null) {

                    const [translation] = await translate.translate(req.body.word, 'en');
                    console.log(translation);
                    return res.status(200).send({ word: translation, auto: true });
                    // const text = await translate(req.body.word, { from: "vi", to: "en" });
                    // console.log(text);
                    // return res.status(200).send({ word: text, auto: true });
                }
                return res.status(200).send({ word: word });
            });
        } catch (err) {
            res.status(400).send({ message: err });
            console.log(err);
        }
    }
});

router.get("/api/recommend-search", async (req, res) => {
    //recommend english word
    let lang = req.body.lang;
    if (lang == "en") {
        try {
            let re = new RegExp("\\b(" + "^" + req.body.word + ")\\b", "g");
            const query = Word.find({ word: { $regex: re } }).limit(10);
            query.exec((err, word) => {
                if (err) return console.error(err);
                return res.status(200).send({ word: word });
            });
        } catch (err) {
            res.status(400).send({ message: err });
            console.log(err);
        }
    } else {
        try {
            let re = new RegExp("\\b(" + "^" + req.body.word + ")\\b", "g");
            const query = WordVn.find({ word: { $regex: re } }).limit(10);
            query.exec((err, word) => {
                if (err) return console.error(err);
                return res.status(200).send({ word: word });
            });
        } catch (err) {
            res.status(400).send({ message: err });
            console.log(err);
        }
    }
});

router.get("/api/translate-paragraph", async (req, res) => {
    const type = req.body.type;
    if (type === "vi") {
        //const text = await translate(req.body.param, { from: "en", to: "vi" });
        const [translation] = await translate.translate(req.body.param, 'vi');
        console.log(translation);
        return res.status(200).send({ param: translation });
    } else {
        //console.log("en")
        const [translation] = await translate.translate(req.body.param, 'en');
        console.log(translation);
        return res.status(200).send({ param: translation });
    }
});

router.get("/api/grammar-check", async (req, res) => {
    const bot = new Grammarbot({
        api_key: process.env.API_GRAMMAR, // (Optional) defaults to node_default
        language: "en-US", // (Optional) defaults to en-US
        base_uri: "api.grammarbot.io", // (Optional) defaults to api.grammarbot.io
    });
    const result = await bot.checkAsync(req.body.text);
    return res.status(200).send({ text: result });
});

export default router;
