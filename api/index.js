const express=require("express")
const app=express();
const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mern-estate")
.then(()=> console.log("Connected to MongoDb"))
.catch((err)=> console.log(err));

app.listen(3000, ()=> console.log("server is running on port 3000"));