import express from 'express'
import fs from 'fs' 
import { fileURLToPath } from 'url'
import path ,{ dirname } from 'path'

const filePath = fileURLToPath(import.meta.url)
const __dirname = dirname(filePath) ;

const router = express.Router()

router.get('/video' , (req , res) => {
    const videoPath = path.join(__dirname , '../video/sample.mp4')
    const videoSize = fs.statSync(videoPath).size ;
    const range = req.headers.range

    if(!range){
        return res.status(400).json({
            error : 'No range header found'
        })
    }
    
    const CHUNK_SIZE = (10**6)*2 ;
    let start = Number(range.replace(/\D/g ,"")) ;
    // if(start !== 0){
    //     start = start+1
    // }
    const end = Math.min(start + CHUNK_SIZE -1 , videoSize - 1)

    if(start > videoSize && end > videoSize){
        return res.status(400).send('Range is not within limit')
    }
    
    const contentLength = end - start + 1 ;
    
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`, 
        'Accept-Ranges' : 'bytes' , 
        'Content-Length' : contentLength , 
        'Content-Type' : 'video/mp4' , 
    }
    res.writeHead(206 , headers)
    
    const videoStream = fs.createReadStream(videoPath , { start , end}) ;
    videoStream.pipe(res)
})


export default router