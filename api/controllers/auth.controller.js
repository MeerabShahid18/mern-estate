const User=require("../models/user.model")
const bcryptjs=require("bcryptjs");
const signup=async(req, res)=>{
    const {username, email, password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password, 10);
    const newUser=new User({username, email, password: hashedpassword});
    try{
        await newUser.save();
        res.status(201).json("Response send successfully");
    }catch(e){
        res.status(500).json(e.message);
    }
    
};
module.exports={
 signup,
};