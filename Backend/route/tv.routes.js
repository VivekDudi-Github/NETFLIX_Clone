import express from 'express' ; 
import {fetchCatagoryTv , fetchSimilarTv , fetchTrendingTv , fetchTvDetails , fetchTvTrailer} from '../controller/Tv.controller.js'


const router = express.Router() ;

router.get('/trending' , fetchTrendingTv)
router.get('/:id/trailer'  , fetchTvTrailer)
router.get('/:id/details'  ,fetchTvDetails)
router.get('/:id/similar'  , fetchSimilarTv)
router.get('/:catagory'  , fetchCatagoryTv)

export default router ;