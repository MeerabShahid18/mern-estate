const express=require("express");
const router=express.Router();
const { signup ,google, signin, update, signOut} = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google',google);
router.get('/signout',signOut);


module.exports=router;