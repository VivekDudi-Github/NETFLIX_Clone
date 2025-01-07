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

        const fetchSearchQueryHistory = await SearchQueryHistory.findOne({
            userId : req.user._id
        }) 

        if(!fetchSearchQueryHistory){
            await SearchQueryHistory.create({
                userId : req.user._id ,
                queries : [textquery]
            })
        }else if(fetchSearchQueryHistory.queries.at(-1)?.text !== textquery.text){
            await SearchQueryHistory.findOneAndUpdate({userId : req.user._id} ,{
                $push : { queries : textquery}
            })
        }
        

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

        const fetchSearchQueryHistory = await SearchQueryHistory.findOne({
            userId : req.user._id
        }) 

        if(!fetchSearchQueryHistory){
            await SearchQueryHistory.create({
                userId : req.user._id ,
                queries : [textquery]
            })
        }else if(fetchSearchQueryHistory.queries?.at(-1)?.text !== textquery.text){
            await SearchQueryHistory.findOneAndUpdate({userId : req.user._id} ,{
                $push : { queries : textquery}
            })
        }
        
            

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

        const fetchSearchQueryHistory = await SearchQueryHistory.findOne({
            userId : req.user._id
        }) 

        if(!fetchSearchQueryHistory){
            await SearchQueryHistory.create({
                userId : req.user._id ,
                queries : [textquery]
            })
        }else if(fetchSearchQueryHistory.queries.at(-1)?.text !== textquery.text){
            await SearchQueryHistory.findOneAndUpdate({userId : req.user._id} ,{
                $push : { queries : textquery}
            })
        }

        return ResSuccess(res ,200 ,response.results )


    } catch (error) {
        if(error.message.includes(404)){
            return res.status(404).send(null)
        }
        console.log(error);
        return ResError(res , 500 , "internal server Error")
    }        
}

//search histroy get and delete

export const getSearchQueryHistory = async( req , res) => {
    try {
        const userId  = req.user._id ; 

        const fetchSearchQueryHistory = await SearchQueryHistory.findOne({userId : userId})
        
        if(!fetchSearchQueryHistory){
            return res.status(200).send(null)
        }else{
            return ResSuccess(res , 200 , fetchSearchQueryHistory)
        }

    } catch (error) {
            console.log('error while fetching Search Query History' , error);
            return ResError(res , 500 , 'Internal server error')
    }

}


export const deleteSearchQueryHistory = async( req , res) => {
    try {
        const {id} = req.params ;
        console.log(id);
        
        await SearchQueryHistory.findOneAndUpdate(
            {userId : req.user._id} , 
            {$pull : { queries : {_id : id}}}
        )
        return ResSuccess(res , 200)     
    
    } catch (error) {
        console.log('error while deleting a query history' , error);
        return ResError(res ,500  , 'Internal server error')
    }
}
