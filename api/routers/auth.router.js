const express=require("express");
const router=express.Router();
const { signup ,google, signin, update} = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google',google);


module.exports=router;