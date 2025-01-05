import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type : String ,
        require : true , 
        unique : true 
    } , 
    email : {
        type : String , 
        require : true , 
        unique : true ,
    } , 
    password : {
        type : String , 
        require : true ,  
    } , 
    Image : {
        type : String , 
        default : '' ,
    } , 
    refreshToken : {
        type : String ,
    } 

} , {Timestamp : true}
)

export const User = mongoose.model('User' , userSchema)