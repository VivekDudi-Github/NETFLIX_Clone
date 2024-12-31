import express from 'express'
import { fetchTrendingMovie , fetchMovieTrailer, fetchSimilarMovies , fetchMovieDetails ,fetchCatagoryMovies } from '../controller/movie.controller.js';

const router = express.Router() ;

router.get('/trending' , fetchTrendingMovie)
router.get('/:id/trailer' , fetchMovieTrailer)
router.get('/:id/details' , fetchMovieDetails)
router.get('/:id/similar' , fetchSimilarMovies)
router.get('/:catagory' , fetchCatagoryMovies)


export default router ;