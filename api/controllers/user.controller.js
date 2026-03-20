const User=require("../models/user.model")
const bcryptjs=require("bcryptjs");
const { errorHnadler } = require("../utils/error");
const Listing = require("../models/listing.model");
const updateUser=async(req, res, next)=>{
    if(req.user.id !== req.params.id){
    return next(errorHandler(401, "You can only update your account"));
    }
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
        if(!updatedUser) return res.status(404).json({message:"user not found"});
        const { password, ...rest } = updatedUser._doc;
        return res.status(200).json(rest);
    }catch(e){
        next(e);
    }


}

const deleteUser=async(req, res, next)=>{
    if(req.user.id!=req.params.id) return next(errorHnadler(401, 'You can only delete your account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({message:'User has been deleted'})
    } catch (error) {
        next(error);
    }

}

const getUserListings=async(req, res, next)=>{
    if(req.user.id===req.params.id){
    try {
        const listings=await Listing.find({userRef: req.params.id});
        res.status(200).json(listings);
        
    } catch (error) {
        next(error)
    }
    }else{
         return next(errorHnadler(401, 'You can only view your listing'));
    }
}

const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
module.exports={
    updateUser,
    deleteUser,
    getUserListings,
    getUser
}