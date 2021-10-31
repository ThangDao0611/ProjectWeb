import express from "express";
import { User } from "../model/user";
import auth from "../middleware/auth";

const routerUser = express.Router();

routerUser.post('/users',async (req,res)=>{
    //Create a new User
    try{
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({user,token});
    }
    catch(err){
        res.status(400).send({message: err});
        console.log(err);
    }
})

routerUser.post('/users/refresh-token', async (req, res)=>{
    // Create a new token and send to client
    try {
        const refreshToken = req.header('Authorization').replace('Bearer ','');
        if(refreshToken){
            const user = await User.findByToken(refreshToken);
            if(!user){
                return res.status(401).send({error: 'Invalid token'});
            }
            const token = await user.generateNewToken(refreshToken);
            res.status(200).send({user,token});
        }
        else{
            res.status(401).send({message: 'Not include token'});
        }
    } catch (error) {
        res.status(400).send({message: 'Cannot refresh token'});
        console.log(error);
    }
})

routerUser.post('/users/login',async (req, res) => {
    // Login a registered user
    try{
        const {email,password} = req.body;
        const user = await User.findByCredentials(email, password);
        if(!user){
            return res.status(401).send({message: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        res.status(200).send({user,token});
    }
    catch(err){
        res.status(400).send({message: 'Cannot Login'});
    }
})

routerUser.get('/users/me',auth,async(req,res)=>{
    //View logged in user profile
    res.status(200).send({'name': req.user.name,'email': req.user.email});
})

routerUser.post('/users/me/logout',auth,async(req,res)=>{
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token;
        })
        await req.user.save();
        res.status(200).send({'message': 'Log out successfully'});
    } catch (error) {
        res.status(500).send(error)
    }
})

routerUser.post('/users/me/logout-all',auth,async(req,res)=>{
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.status(200).send({'message': 'Log out all successfully'});
    } catch (error) {
        res.status(500).send(error)
    }
})

export default routerUser;