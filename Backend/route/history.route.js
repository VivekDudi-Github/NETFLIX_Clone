import express from 'express'
import { deleteSearchHistory, getSearchHistory } from '../controller/search.controller.js';

const router = express.Router() ;

router.get('/' , getSearchHistory)
router.delete('/:id' , deleteSearchHistory)

export default router ;