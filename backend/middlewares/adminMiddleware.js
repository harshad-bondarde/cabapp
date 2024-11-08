const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")

export function adminMiddleware(req,res,next){
    const auth=req.header.authorization
    if(!auth){
        return res.status(403).json({
            message:"you are not logged in ..."
        })
    }
    const token=auth;
    try {
        const decoded=jwt.verify(token,JWT_SECRET);
        if(decoded.adminid){
            req.adminid=decoded.adminid;
            next();
        }
        else{
            return res.status(403).res.json({})
        }
    } catch (error) {
        return res.json(403).json({
            message:"error while verifying the token"
        })
    }
}