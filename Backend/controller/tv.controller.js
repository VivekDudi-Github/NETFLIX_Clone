import { searchHistory } from "../models/searchHistory.model.js"
import { fetchFromTMDB } from "../utils/movieAPI.js"

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

export const fetchTrendingTv = async(req , res) => {
    try {           
        const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
        const data = await fetchFromTMDB(url) ;
        
        const randomtvIndex = Math.floor(Math.random()*data.results.length)
        const randomtv = data.results[randomtvIndex] ;

        return ResSuccess(res , 200 , randomtv)

    } catch (error) {
        console.log(error);
        return ResError(res , 500 , "internal server error")
    }
}

export const fetchTvTrailer = async(req , res) => {
    try {
        const {id} = req.params ; 
        const url  = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`

        const response = await fetchFromTMDB(url) ;
        if(response.results < 1){
            return res.status(404).send(null)
        }

        return ResSuccess(res , 200 , response.results)


    } catch (error) {
        if(error.message.includes('404')){
            return res.status(404).send(null)
        }
        console.log("error while fetcching the trailer" , error);
        return ResError(res , 500 , "internal server error")
        
    }
}

export const fetchTvDetails = async(req , res) => {
    try {
        const {id} = req.params ;
        const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`
        
        const response = await fetchFromTMDB(url) ;
        if(!response){
            return ResError(res , 400 , null)
        }
        
        const HistoryExists = await searchHistory.findOne({userId : req.user._id})
        const VisitedField = {
            name :response.original_name || response.original_name,
            id : response.id ,
            avatar : response.poster_path ,
            type : 'TV' ,
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
        }console.log(error);
        
        return ResError(res ,500 ,"Internal server Error" )
    }
}


export const fetchSimilarTv = async(req , res) => {
    try {
        const {id} = req.params ;
        const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1` ;

        const response = await fetchFromTMDB(url) ;
        console.log(response);
        
        return ResSuccess(res , 200 , response.results)

    } catch (error) {
        if(error.message.includes(404)){
            return res.status(404).send(null)
        }
        console.log('error in fetching similar tv shows' , error);
        
        return ResError(res , 500 ,"internal server error")
    }
}

export const fetchCatagoryTv = async(req , res) => {
    try {
        //catgories = top_rated , popular , on_the_air , airing_today
        const {catagory} = req.params ;
        const url = `https://api.themoviedb.org/3/tv/${catagory}?language=en-US&page=1'`
        const response = await fetchFromTMDB(url) ;
        
        return ResSuccess(res , 200 , response.results) ;

    } catch (error) {
        console.log("error in getting movie from catagory" , error);
        if(error.message.includes(404))
            return ResError(res , 404 , "no movies found in this catagory")
        return ResError(res , 500 , "internal server error")
    }
}



