const express=require("express");
const router=express.Router();
const { signup ,google, signin} = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google',google);

module.exports=router;