import { fetchFromTMDB } from "../utils/movieAPI.js";
import {searchHistory} from '../models/searchHistory.model.js'

const ResError = (res, statusCode , error) => {
    return res.status(statusCode).json({
        success : false ,
        error : error
    })
}
const ResSuccess = (res , statusCode , data) => {
    return res.status(statusCode).json({
        success : true , 
        data : data
    })
}


export const fetchTrendingMovie = async( req , res) => {
    try {
        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
        const data = await fetchFromTMDB(url) ;

        const randomMovieIndex = Math.floor(Math.random()*data.results.length)
        const randomMovie = data.results[randomMovieIndex] ;

        return ResSuccess(res , 200 , randomMovie)

    } catch (error) {
        console.log(error);
        return ResError(res , 500 , "internal server error")
    }
}

export const fetchMovieTrailer = async(req , res)=>{
    try {
        const {id} = req.params ; 
        const url  = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`

        const response = await fetchFromTMDB(url) ;

        return ResSuccess(res , 200 , response.results)


    } catch (error) {
        if(error.message.includes('404')){
            return res.status(404).send(null)
        }
        console.log("error while fetcching the trailer" , error);
        return ResError(res , 500 , "internal server error")
        
    }
}

export const fetchMovieDetails = async( req , res) => {
    try {
        const {id} = req.params ;
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        
        const response = await fetchFromTMDB(url) ;
        if(!response){
            return ResError(res , 400 , null)
        }
        
        const HistoryExists = await searchHistory.findOne({userId : req.user._id})
        const VisitedField = {
            name :response.name || response.original_name || response.original_title,
            id : response.id ,
            avatar : response.poster_path ,
            type : 'Movie' ,
        }
        
        if(!HistoryExists){
            await searchHistory.create(
                {userId : req.user._id , 
                 visited : [VisitedField] ,
                }
            )
        }else if(HistoryExists?.visited?.at(-1)?.id !== response.id.toString()){
            await searchHistory.findOneAndUpdate(
                {userId : req.user._id} , 
                {$push : {visited : VisitedField}}
            )
        }

        return ResSuccess(res , 200 , response)

    } catch (error) {
        if(error.message.includes(404)){
            return res.status(404).send(null) ;
        }
        
        return ResError(res ,500 ,"Internal server Error" )
    }
}

export const fetchSimilarMovies = async(req , res) => {
    try {
        const {id} = req.params ;
        const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1` ;

        const response = await fetchFromTMDB(url) ;
        if(response.results.length < 1){
            return res.status(404).send(null)
        }
        return ResSuccess(res , 200 , response.results)

    } catch (error) {
        console.log("error in fetching similar movies" , error);
        return ResError(res , 500 ,"internal server error")
    }
}

export const fetchCatagoryMovies = async(req , res) => {
    try {
        //catgories = top_rated , popular , upcoming , now_playing
        const {catagory} = req.params ;
        
        const url = `https://api.themoviedb.org/3/movie/${catagory}?language=en-US&page=1`
        const response = await fetchFromTMDB(url) ;
        
        return ResSuccess(res , 200 , response.results) ;

    } catch (error) {
        // console.log("error in getting movie from catagory" , error);
        if(error.message.includes(404))
            return ResError(res , 404 , "no movies found in this catagory")
        return ResError(res , 500 , "internal server error")
    }
}