const jwt = require('jsonwebtoken');
const { errorHnadler } =require('./error');
const verifyToken=(req, res, next)=>{
    const token=req.cookies.access_token;
    if(!token) return next(errorHnadler(401,"Unauthorized"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
    if(err) return next(errorHnadler(403,"Forbidden"));
    req.user=user;
    next();
})
}

module.exports={
    verifyToken
}

