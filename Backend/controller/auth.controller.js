import { User } from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import {generateTokenAndSetCookie} from "../utils/generateJwt.js"

export const signupFunc = async(req , res) => {
    try {    
        const {email , username , password } = req.body ;
        
        
    
        if(!email || !username || !password){
            const missingfeilds = [] ;
            !email ? missingfeilds.push('email') : null ;
            !username ? missingfeilds.push('username') : null ;
            !password ? missingfeilds.push('password') : null ;
            return ResError(res ,400 , "server didn't get the "+ missingfeilds )
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return ResError( res , 400 , 'email format is incorrect')
        }
        

        if(password.length<10){
            return ResError(res ,400 , 'password length is less than 10 words')
        }
        const salt = await bcryptjs.genSalt(10)    
        const hashPassword = await bcryptjs.hash(password , salt)
    
        const existingEmail = await User.findOne({email})
        const existingUsername = await User.findOne({username})

        if(existingEmail){
            return ResError(res , 400 , email +': email is already used')
        }
        if(existingUsername){
        return ResError(res , 400 , username+': username is already taken')
        }

        let user = await User.create({
            email ,
            username , 
            password : hashPassword ,
        })
        const token = generateTokenAndSetCookie(user._id , res)
        
        
        user = await User.findOneAndUpdate(
            {_id : user._id } , 
            {$set : {
                refreshToken : token 
            }} , 
            {new : true}
        ).select('-password -refreshToken')
        
    return res.status(201).json(user)
   
    } catch (error) {
        console.log('error from signupFunc' ,error);
        return ResError(res ,400 , 'singingUp func , error:'+error)
   }

}

const ResError = (res ,status , error ) => {
    return res.status(status).json({
        error :  error
    })
}

export const loginFunc = async(req , res) => {
    try {
        const {email , password} = req.body ;
        
        if(!email || !password){
            return ResError(res , 400 , "invalid credentials" )
        }
    
        const UserExistCheck = await User.findOne({email : email})
        
        if(!UserExistCheck){
            return ResError(res , 400 , "no user found with the following email" ) 
        }
    
        const checkPassword = await bcryptjs.compare(password , UserExistCheck.password)
        
        

        if(checkPassword !== true){
            return ResError(res , 400 , "password was incorrect")
        }
    
        const refreshToken = generateTokenAndSetCookie(UserExistCheck._id , res)
    
        const user = await User.findOneAndUpdate(
            {_id : UserExistCheck._id } , 
            { $set : {
                refreshToken : refreshToken
            }} , 
            {new : true}
        ).select("-password -refreshToken")
        
        return res.status(200).json({
            message : "loggedin successfully" , 
            user
        })
    
    } catch (error) {
        console.log("error in login func",error);
        return res.status(500).json({
            error : error
        })
    }
}


export const logoutFunc = async(req , res) => {
    
    try {
        res.clearCookie('refreshToken')
        
        return res.status(200).json({
            message : 'Successfully logged Out'
        }) 

    } catch (error) {
        console.log('error while loggin Out' , error);
        return res.status(400).json('error while loggin out', error)
    }
}


export const authCheckFunc = async(req ,res) => {
    try {
        let user = req.user
        user = user.toObject()
        const { password , refreshToken , ...restUser} = user
       
        

        return res.status(200).json({
            success : true ,
            user : restUser ,
        })
    } catch (error) {
        console.log('error in authCheckFunc ', error);
        return res.status(500).json({
            success : false , 
            error : 'internal server error'
        })
    }
}
