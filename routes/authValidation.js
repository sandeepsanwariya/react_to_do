const jwt =require('jsonwebtoken')
const dotenv=require('dotenv');
dotenv.config()
const auth=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token) return res.status(401).json('Access Denied')
    try{
        const varify=jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=varify
        next()
    }
    catch (err){
        return res.status(401).json('Invalid token')
    }

}
module.exports =auth