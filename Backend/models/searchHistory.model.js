import mongoose from "mongoose";

const VisitedHistorySchema = mongoose.Schema({
    name : {
        type : String ,  
        required : true 
    } , 
    id : {
        type : String , 
        required : true , 
    } ,
    avatar : {
        type : String , 
    } , 
    type : {
        type : String , 
        enum : ['Movie' , 'Person' , 'Tv'] ,
        required : true
    }

}  , { timestamp : true})


const SearchHistorySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User' , 
        required : true 
    } ,
    visited : {
        type : [VisitedHistorySchema]
    }

} , {timestamp : true}
)

export const searchHistory = mongoose.model('SeachHistory' , SearchHistorySchema)

const SearchQueryHistorySchema  = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User' , 
        required : true ,
    } , 
    queries : [
        {
            text : {
                type : String , 
                required : true , 
            } , 
            type : {
                type : String ,
                enum : ['Movie' , 'Tv' , 'Person'] , 
                required : true 
            }
        }
    ]
} , {timestamps : true})

export const SearchQueryHistory = mongoose.model('SearchQueryHistory' , SearchQueryHistorySchema)