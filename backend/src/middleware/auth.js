import jwt from 'jsonwebtoken';
import {User} from '../model/user';

const auth = async (req,res,next)=>{
    const token = req.header('Authorization').replace('Bearer ','');
    if(!token){
        return res.status(403).send({error: 'No token provided'});
    }
    
    // if (!data) {
    //     if(error.name === 'TokenExpiredError'){
    //         return res.status(403).send({message: 'Token Expired'});
    //     }
    //     else{
    //         return res.status(403).send({message: 'Token Error'});
    //     }
    // }
    try {
        const data = jwt.verify(token,process.env.JWT_KEY);
        const user = await User.findOne({_id: data._id, 'tokens.token': token }).exec();
        if(!user){
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({error: 'Not authorized to access this resource'});
    }
}

export default auth;