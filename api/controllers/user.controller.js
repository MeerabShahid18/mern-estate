const User=require("../models/user.model")
const bcryptjs=require("bcryptjs");
const updateUser=async(req, res, next)=>{
    try{
        const {id}=req.params;
        const{username, email, avatar, password:newPassword}=req.body;
         const updatedData = { username, email, avatar };
        if(newPassword){
            updatedData.password=bcryptjs.hashSync(newPassword, 10)
        }
        const updatedUser=await User.findByIdAndUpdate(
            id,
            {$set:updatedData},
            {new:true}
        )
        if(!updatedUser) return res.status(404).json(message,"user not found");
        const { password, ...rest } = updatedUser._doc;
        return res.status(200).json(rest);
    }catch(e){
        next(e);
    }


}
module.exports={
    updateUser
}