const User=require("../models/user.model")
const bcryptjs=require("bcryptjs");
const {errorHnadler}=require("../utils/error")
const jwt=require("jsonwebtoken");
const signup=async(req, res, next)=>{
    const {username, email, password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password, 10);
    const newUser=new User({username, email, password: hashedpassword});
    try{
        await newUser.save();
        res.status(201).json("Response send successfully");
    }catch(e){
        next(e);
    }
    
};

const signin=async(req, res, next)=>{
    const {email, password}=req.body;
    try{
        const validUser=await User.findOne({email});
        if(!validUser) return next(errorHnadler(404, 'User not found'));
        const validpassword=bcryptjs.compareSync(password, validUser.password);
        if(!validpassword) return next(errorHnadler(404, 'Invalid credentials'));
        const token=jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        res
        .cookie('access_token', token,{httpOnly: true})
        .status(200)
        .json(validUser);
    }catch(e){
      next(e);
    }

}
module.exports={
 signup,
 signin
};