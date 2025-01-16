import React , {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import toast from 'react-hot-toast';
import { set } from 'mongoose';
import Navbar from '../Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player/youtube'
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';

function WatchPage() {
    const {id} = useParams() ;
    const [isLoading , setIsLoading] = useState(true) ;
    const [trailers, setTrailers] = useState([]) ;
    const [currentTrailerIndex , setCurrentTrailerIndex] = useState(0) ;
    const [content , setContent] = useState(null) ;
    const [similarContent , setSimilarContent] = useState([]) ; 

    const {contentType} = useContentStore() ;

    useEffect(() => {

        const getTrailers = async () => {
        try {
            const data =  await axios.get(`/api/v1/${contentType}/${id}/trailer`)
            setTrailers(data.data.data)
            
        } catch (error) {
            if(error?.message?.includes(404)){
                setTrailers([])
            }else{
                console.log(error);
            }
        }finally{
            setIsLoading(false)
        }
        }
        getTrailers() ;
    } , [contentType , currentTrailerIndex  ])

    useEffect(() => {

        const getSimilarContent = async () => {
        try {
            const data =  await axios.get(`/api/v1/${contentType}/${id}/similar`)
            setSimilarContent(data.data.data)
         
            
        } catch (error) {
            if(error?.message?.includes(404)){
                setSimilarContent([])
            }else{
                console.log(error);
            }
        }finally{
            setIsLoading(false)
        }
        }
        getSimilarContent() ;
    } , [contentType ])

    useEffect(() => {

        const getContentDetail = async () => {
        try {
            const data =  await axios.get(`/api/v1/${contentType}/${id}/details`)
            setContent(data.data.data)
            
        } catch (error) {
            if(error?.message?.includes(404)){
                setContent(null)
            }else{
                console.log(error);
            }
        }finally{
            setIsLoading(false)
        }
        }
        getContentDetail() ;
    } , [contentType ])

    const IncreaseCurrentTrailerIndex = () => {
        if(currentTrailerIndex !== trailers.length-1){
            setCurrentTrailerIndex(currentTrailerIndex+1)
        }
    }
    
    const DecreaseCurrentTrailerIndex = () => {
        if(currentTrailerIndex !== 0){
            setCurrentTrailerIndex(currentTrailerIndex-1)
        }
    }
    
    
    console.log(currentTrailerIndex , trailers);
    

  return (
    <div className='bg-black min-h-screen text-white '>
      <Navbar />  
        <div className='mx-auto container h-full px-4'>
            

            {trailers.length > 0 && (
                <>
                  <div className='flex justify-between items-center mb-4'>
                    <button className={` bg-gray-600/60 hover:bg-gray-600 py-2 px-4  rounded duration-200
                        ${currentTrailerIndex === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer ' }`}
                        disabled= {currentTrailerIndex === 0}
                        onClick={DecreaseCurrentTrailerIndex}
                        >
                        <ChevronLeft size={24} />
                    </button>
                    <button className={`bg-gray-600/60 hover:bg-gray-600 py-2 px-4 rounded duration-200
                        ${currentTrailerIndex === trailers.length-1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer ' }`}
                        disabled= {currentTrailerIndex == trailers.length-1}
                        onClick={IncreaseCurrentTrailerIndex}
                        >
                        <ChevronRight size={24} />
                    </button>
                  </div>
                </>
            )}
            <div className={ `  mb-8 p-2 ${trailers.length == 0 ? "h-40 w-full" : "aspect-video"}` }>
                {trailers.length > 0 && (
                        <ReactPlayer
                        controls = {true}
                        width={'100%'}
                        height={'100%'}
                        className = 'mx-auto overflow-hidden rounded-md'
                        url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex]?.key}`} />
                )}

                {trailers.length == 0 && ( 
                    <h2 className='text-xl text-center mt-5'>
                        NO Trailer available for{" "}
                        <span className='font-bold text-red-600'>{content?.title || content?.name}</span>
                    </h2>
                )}
            </div>
            
            <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto '>
                <div className='mb-4 md:mb-0'>
                    <h2 className='text-5xl font-bold text-balance'>
                        {content?.title || content?.name}
                    </h2>
                    <p className='mt-2 text-lg'>
                       {content?.release_date || content?.first_on_air} {" "}
                        <span className={content?.adult? 'text-red-600' : 'text-green-600'}>{content?.adult? '18+' : 'PG-13'}</span>
                    </p>
                    <p className='text-lg mt-4'>{content?.overview}</p>
                </div>
                <img className='max-h-[600px] rounded-md' src={ORIGINAL_IMG_BASE_URL+content?.poster_path || ORIGINAL_IMG_BASE_URL+content?.backdrop_path } />
            </div>
        </div>
    </div>
  )
}

export default WatchPage