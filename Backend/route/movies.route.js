import express from 'express'
import { fetchTrendingMovie } from '../controller/movie.controller.js';

const router = express.Router() ;

router.get('/trending' , fetchTrendingMovie)


export default router ;