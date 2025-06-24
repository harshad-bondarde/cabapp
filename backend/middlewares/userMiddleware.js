const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")

function userMiddleware(req,res,next){
    const auth=req.headers.authorization
    if(!auth){
        console.log("not logged in ")
        return res.status(403).json({
            message:"you are not logged in ..."
        })
    }
    const token=auth;
    try {
        const decoded=jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }
        else{
            return res.status(401).res.json({
                message:"You are not Signed In"
            })
        }
    } catch (error) {
        return res.json(503).json({
            message:"internal server error :"+error
        })
    }
}

module.exports={userMiddleware}