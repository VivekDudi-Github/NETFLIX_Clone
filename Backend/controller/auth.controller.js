import { User } from "../models/user.models.js";
import bcryptjs from 'bcryptjs'


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

    const user = await User.create({
        email ,
        username , 
        password : hashPassword ,
    })

    return res.status(201).json({...user._doc , password : null})
    } catch (error) {
    console.log('error from signupFunc' ,error);
    return resError(400 , 'singingUp func , error:'+error)
   }

}

export const loginFunc = async(req , res) => {
    res.send("login")
}

export const logoutFunc = async(req , res) => {
    res.send("logout")
}

