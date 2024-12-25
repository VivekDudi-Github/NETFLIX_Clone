import jwt from 'jsonwebtoken'
import {ENV_VARS} from "../config/envVAr.js"

export const generateTokenAndSetCookie = (userId , res) => {
    const token = jwt.sign({userId} , ENV_VARS.JWT_SECRET , {expiresIn : '15d'})
    
    res.cookie('refreshToken' , token , {
        maxAge : 15*24*60*60*1000 ,
        httpOnly : true , 
        secure : true , 
        sameSite : 'strict' 
    })
    return token
}
