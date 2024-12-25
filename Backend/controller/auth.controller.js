import { User } from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import {generateTokenAndSetCookie} from "../utils/generateJwt.js"

export const signupFunc = async(req , res) => {
const resError = (status , error) => {
    return res.status(status).json({
        error :  error
    })
}

    try {
        const {email , username , password } = req.body ;
        
        
    
        if(!email || !username || !password){
            const missingfeilds = [] ;
            !email ? missingfeilds.push('email') : null ;
            !username ? missingfeilds.push('username') : null ;
            !password ? missingfeilds.push('password') : null ;
            return resError(400 , "server didn't get the "+ missingfeilds )
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return resError(400 , 'email format is incorrect')
        }
        

        if(password.length<10){
            return resError(400 , 'password length is less than 10 words')
        }
        const salt = await bcryptjs.genSalt(10)    
        const hashPassword = await bcryptjs.hash(password , salt)
    
        const existingEmail = await User.findOne({email})
        const existingUsername = await User.findOne({username})

        if(existingEmail){
            return resError(400 , email +': email is already used')
        }
        if(existingUsername){
        return resError(400 , username+': username is already taken')
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
        return resError(400 , 'singingUp func , error:'+error)
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
            
            const missingfeilds = [] ;
            !email ? missingfeilds.push('email') : null ;
            !password ? missingfeilds.push('password') : null ;
            
            return ResError(res , 400 , "required feilds are missing : "+missingfeilds )
        }
    
        const UserExistCheck = await User.findOne({email : email})
        
        if(!UserExistCheck){
            return ResError(res , 400 , "no user found with the following email" + email ) 
        }
    
        const checkPassword = await bcryptjs.compare(password , UserExistCheck.password)
        console.log(checkPassword);
        

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
        )
    
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
    res.send("logout")
    
    try {
        res.clearCookies()
        
        return res.status(200).json({
            message : 'Successfully logged Out'
        }) 

    } catch (error) {
        console.log('error while loggin Out' , error);
        return res.status(400).json('error while loggin out', error)
    }
}

