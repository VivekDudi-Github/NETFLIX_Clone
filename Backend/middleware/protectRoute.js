import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
import { ENV_VARS } from "../config/envVAr.js";


export const protectRoute = async(req , res ,next) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken
  
        if(!incomingRefreshToken){
            return res.status(401).json({
                success: false , 
                error : "no token received"
            })
        }
        const decodedUser = jwt.verify(incomingRefreshToken  , ENV_VARS.JWT_SECRET)
        
        const user = await User.findById(decodedUser.userId)
        
        if(!user){
            return res.status(401).json({
                success : false , 
                error : "coundn't find a user "
            })
        }
        req.user = user ; 
        next() ;
    
        
    } catch (error) {
        if(error.message.includes('invalid signature')){
            return res.status(401).json({
                success :false , 
                erorr : "unauthorized request"
            })
        }
        console.log(error);
        return res.status(500).json({
            success : false , 
            error : 'internal server error'
        })
    }

}