import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require: true,
        trim: true
    },
    email:{
        type:String,
        require: true,
        unique: true,
        lowercase: true,
        validate: value=>{
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    },
    password:{
        type:String,
        require: true,
        minLength: 7
    },
    tokens:[{
        token:{
            type:String,
            require: true
        },
        refreshToken:{
            type: String,
            require: true
        }
    }]
})

userSchema.pre('save',async function(next){
    // Hash the password before saving the user model
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id},process.env.JWT_KEY,{
        expiresIn: process.env.TOKEN_LIFE
    });
    const refreshToken = jwt.sign({_id: user._id},process.env.JWT_REFRESHKEY,{
        expiresIn: process.env.REFRESHTOKEN_LIFE
    })
    user.tokens = user.tokens.concat({token, refreshToken});
    await user.save();
    return token;
}

// Not Test:
userSchema.methods.generateNewToken = async function(refreshToken){
    //Generate new token and save it in tokens
    const user = this;
    const accessToken = jwt.sign({_id: user._id},process.env.JWT_KEY,{
        expiresIn: process.env.TOKEN_LIFE
    });
    user.tokens.forEach((token)=>{
        if(token.refreshToken === refreshToken){
            token.token = accessToken;
        }
    })
    await user.save();
    return accessToken;
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({email});
    if(!user){
        throw new Error({error: 'Invalid login credential'});
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        throw new Error({error: 'Invalid login credential'});
    }
    return user;
}

//Not Test
userSchema.statics.findByToken = async (refreshToken)=>{
    //Search for a user by refreshToken
    const user = await User.findOne({'tokens.refreshToken': refreshToken});
    if(!user){
        throw new Error({error: 'Invalid refreshToken'});
    }
    return user;
}

export const User = mongoose.model('User',userSchema);

