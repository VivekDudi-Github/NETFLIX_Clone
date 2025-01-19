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
        enum : ['Movie' , 'Person' , 'TV'] ,
        required : true
    }

}  , { timestamps : true})


const SearchHistorySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User' , 
        required : true 
    } ,
    visited : {
        type : [VisitedHistorySchema]
    }

} , {timestamps : true}
)

export const searchHistory = mongoose.model('SeachHistory' , SearchHistorySchema)

const SearchQueryHistorySchema  = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User' , 
        required : true ,
    } , 
    queries : {
        type : [
            {
                text : {
                    type : String , 
                    required : true , 
                } , 
                type : {
                    type : String ,
                    enum : ['Movie' , 'TV' , 'Person'] , 
                    required : true 
                }
            }
        ] ,
        default : []
    }
} , {timestamps : true})

export const SearchQueryHistory = mongoose.model('SearchQueryHistory' , SearchQueryHistorySchema)