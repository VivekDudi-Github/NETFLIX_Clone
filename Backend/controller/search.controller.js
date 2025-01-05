import { fetchFromTMDB } from "../utils/movieAPI.js"
import { SearchQueryHistory } from "../models/searchHistory.model.js"

const ResError = (res , code ,error) => {
    return res.status(code).json({
        success: false ,
        error : error ,
    })
}
const ResSuccess = (res , code  , data) => {
    return res.status(code).json({
        success : true , 
        data : data
    })
}


export const searchMovieFunc  = async (req , res)=> {
    try {
        const {query} = req.params
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        const response = await fetchFromTMDB(url)
        const textquery = {
            text : query , 
            type : 'Movie'
        }

        await SearchQueryHistory.findOneAndUpdate(
            {userId : req.user._id} , 
            {$push : { queries : textquery}} , 
            {new : true ,upsert : true }
        )


        return ResSuccess(res ,200 ,response.results )


    } catch (error) {
        if(error.message.includes(404)){
            return res.status(404).send(null)
        }
        console.log(error);
        return ResError(res , 500 , "internal server Error")
    }        
}

export const searchPersonFunc  = async (req , res)=> {
    try {
        const {query} = req.params
        const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
        const response = await fetchFromTMDB(url)
        const textquery = {
            text : query , 
            type : 'Person'
        }

        await SearchQueryHistory.findOneAndUpdate(
            {userId : req.user._id} , 
            {$push : { queries : textquery}} , 
            {new : true ,upsert : true }
        )

        return ResSuccess(res ,200 ,response.results )


    } catch (error) {
        if(error.message.includes(404)){
            return res.status(404).send(null)
        }
        console.log(error);
        return ResError(res , 500 , "internal server Error")
    }        
}

export const searchTvFunc  = async (req , res)=> {
    try {
        const {query} = req.params ;
        const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        const response = await fetchFromTMDB(url)
        const textquery = {
            text : query , 
            type : 'Tv'
        }

        await SearchQueryHistory.findOneAndUpdate(
            {userId : req.user._id} , 
            {$push : { queries : textquery}} , 
            {new : true ,upsert : true }
        )



        return ResSuccess(res ,200 ,response.results )


    } catch (error) {
        if(error.message.includes(404)){
            return res.status(404).send(null)
        }
        console.log(error);
        return ResError(res , 500 , "internal server Error")
    }        
}