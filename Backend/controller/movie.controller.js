import { fetchFromTMDB } from "../utils/movieAPI.js";


const ResError = (res, statusCode , error) => {
    return res.status(statusCode).json({
        error : error
    })
}

export const fetchTrendingMovie = async( req , res) => {
    try {
        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
        const data = await fetchFromTMDB(url) ;

        const randomMovieIndex = Math.floor(Math.random()*data.results.length)
        console.log(randomMovieIndex);
        

        const randomMovie = data.results[randomMovieIndex] ;


        return res.status(200).json({
            data : randomMovie
        })

    } catch (error) {
        console.log(error);
        return ResError(res , 500 , "error while fetch a movie"+ error)
    }
}