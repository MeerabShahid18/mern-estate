const express=require("express");
const router=express.Router();
const {createListing}=require('../controllers/listing.controller');
const { verifyToken } = require("../utils/verifyUser");

router.post('/create',verifyToken,createListing);