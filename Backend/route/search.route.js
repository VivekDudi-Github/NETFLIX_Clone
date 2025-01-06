import express from 'express'
import { searchMovieFunc ,searchPersonFunc , searchTvFunc } from '../controller/search.controller.js';
import { deleteSearchQueryHistory , getSearchQueryHistory } from '../controller/search.controller.js';

const router = express.Router() ;

router.get('/person/:query' , searchPersonFunc) 
router.get('/movie/:query' , searchMovieFunc)
router.get('/tv/:query' , searchTvFunc)

router.get('/query/history' , getSearchQueryHistory)
router.delete('/query/history/:id' , deleteSearchQueryHistory)

export default router