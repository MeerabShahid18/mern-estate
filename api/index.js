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