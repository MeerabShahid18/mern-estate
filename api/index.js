const express=require("express")
const app=express();
const mongoose=require("mongoose");
const userRouter=require("./routers/user.router");
const authRouter=require("./routers/auth.router");
mongoose.connect("mongodb://127.0.0.1:27017/mern-estate")
.then(()=> console.log("Connected to MongoDb"))
.catch((err)=> console.log(err));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.listen(3001, ()=> console.log("server is running on port 3001"));