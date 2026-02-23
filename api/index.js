const express=require("express")
const app=express();
const mongoose=require("mongoose");
const userRouter=require("./routers/user.router");
const authRouter=require("./routers/auth.router");
const dotenv=require("dotenv");
dotenv.config();
mongoose.connect("mongodb+srv://alishair7071_db_user:tyOgHUl0aLbJKfQX@lms-cluster.b0szrmk.mongodb.net/?appName=lms-cluster")
.then(()=> console.log("Connected to MongoDb"))
.catch((err)=> console.log(err));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err, req, res, next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
    
});
app.listen(3000, ()=> console.log("server is running on port 3000"));