import React , {useState , useEffect, useRef} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import toast from 'react-hot-toast';
import { set } from 'mongoose';
import Navbar from '../Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player/youtube'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';

function WatchPage() {
    const {id} = useParams() ;
    const SliderRef = useRef(null)

    const [isLoading , setIsLoading] = useState(true) ;
    const [IsLoadingTrailers , setIsLoadingTrailers] = useState(true) ;
    const [isLoadingSimilar , setIsLoadingSimilar] = useState(true) ;
    
    

    const [trailers, setTrailers] = useState([]) ;
    const [currentTrailerIndex , setCurrentTrailerIndex] = useState(0) ;
    const [content , setContent] = useState(null) ;
    const [similarContent , setSimilarContent] = useState([]) ; 
    const [IsShowArrows , setIsShowArrows] = useState(false)

    const {contentType} = useContentStore() ;
console.log(content);

    useEffect(() => {

        const getTrailers = async () => {
        try {
            setIsLoadingTrailers(true)
            const data =  await axios.get(`/api/v1/${contentType}/${id}/trailer`)
            setTrailers(data.data.data)
            
        } catch (error) {
            setIsLoadingTrailers(false)
            if(error?.message?.includes(404)){
                setTrailers([])
            }else{
                console.log(error);
            }
        }finally{
            setIsLoadingTrailers(false)
        }
        }
        getTrailers() ;
    } , [contentType , currentTrailerIndex  , id ])

    useEffect(() => {

        const getSimilarContent = async () => {
        try {
            setIsLoadingSimilar(true)
            const data =  await axios.get(`/api/v1/${contentType}/${id}/similar`)
            
            setSimilarContent(data.data.data)
         
            
        } catch (error) {
            setIsLoadingSimilar(true)
            if(error?.message?.includes(404)){
                setSimilarContent([])
            }else{
                console.log(error);
            }
        }finally{
            setIsLoadingSimilar(false)
        }
        }
        getSimilarContent() ;
    } , [contentType , id ])

    useEffect(() => {

        const getContentDetail = async () => {
        try {
            setIsLoading(true)
            const data =  await axios.get(`/api/v1/${contentType}/${id}/details`)
            setContent(data.data.data)
            
        } catch (error) {
            setIsLoading(true)
            if(error?.message?.includes(404)){
                setContent('null')
            }else{
                console.log(error);
            }
        }finally{
            setIsLoading(false)
        }
        }
        getContentDetail() ;
    } , [contentType , id ])

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
    
    const OnScrollLeft = () => {
        if(SliderRef?.current){
            SliderRef.current.scrollBy({ left: -SliderRef.current.offsetWidth/2, behavior: "smooth" });
          }
    }
    const OnScrollRight = () => {
        if(SliderRef?.current){
            SliderRef.current.scrollBy({ left: SliderRef.current.offsetWidth/2, behavior: "smooth" });
          }
    }

    if(content === 'null'){
        return (
            <div className='bg-black min-h-screen text-white '>
            <Navbar />
            <h1 className='text-5xl font-bold min-h-[500px] items-center flex justify-center text-white '>
                No Content Found 😢
            </h1>
            </div>  
        )
    }
    

  return (
    <div className='bg-black min-h-screen text-white '>
      <Navbar />  
        <div className='mx-auto container h-full px-4'>
            
            {/* trailer navigate  */}
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

            {/* trailers'div */}
            {IsLoadingTrailers && (
                <div className='aspect-video p-6 mb-8 bg-black shimmer rounded-lg'>
                </div>
            )}
            {!IsLoadingTrailers && (
                <div className={ `  mb-8  ${trailers.length == 0 ? "h-40 w-full" : "aspect-video p-2"}` }>
                {trailers.length > 0 && (
                        <ReactPlayer
                        controls = {true}
                        width={'100%'}
                        height={'100%'}
                        className = ' rounded-md'
                        url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex]?.key}`} />
                )}

                {trailers.length == 0 && ( 
                    <h2 className='text-xl text-center mt-5'>
                        NO Trailer available for{" "}
                        <span className='font-bold text-red-600'>{content?.title || content?.name}</span>
                    </h2>
                )}
            </div>
            )}

            {/* overview & Poster */}
            {isLoading && (
                <>
                    <div className=' w-full gap-5 flex flex-col'>
                        <div className='w-1/3 h-16 shimmer rounded-lg ' />
                        <div className='w-1/4 h-10 shimmer rounded-lg'/>
                        <div className='w-full h-40 shimmer rounded-lg'/>
                        <div className='w-[90%] h-[500px] mx-auto shimmer rounded-lg '/>
                    </div>
                </>
            )}

            {!isLoading && (
            <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto '>
                <div className='mb-4 md:mb-0'>
                    <h2 className='text-5xl font-bold text-balance'>
                        {content?.title || content?.name}
                    </h2>
                    <p className='mt-2 text-lg'>
                       {content?.release_date || content?.first_on_air || content?.first_air_date} {" | "}
                        <span className={content?.adult? 'text-red-600' : 'text-green-600'}>{content?.adult? '18+' : 'PG-13'}</span>
                    </p>
                    <div className='flex flex-wrap gap-1'>
                        {content?.genres.map((genre , index) => (
                            <div key={index} className='px-2 mt-4 hover:bg-gray-900 py-1 border-[1px] border-white rounded-2xl'>
                                {genre.name}
                            </div>
                        ))}
                    </div>
                    <p className='text-lg mt-4'>{content?.overview}</p>
                </div>
                <img className='max-h-[600px] rounded-md' src={ORIGINAL_IMG_BASE_URL+content?.poster_path || ORIGINAL_IMG_BASE_URL+content?.backdrop_path } />
            </div>
            )}

            {/* similar content section */}
            
            {similarContent.length !== 0 && (
                <>
                <h2 className='font-bold text-2xl p-2 mt-4'>Similar Movies/TV Shows</h2>
                <div className='relative'>
                    <div className=' overflow-hidden flex ' 
                    onMouseEnter={() => setIsShowArrows(true)}
                    onMouseLeave={() => setIsShowArrows(false)}
                    ref={SliderRef}>
                        {similarContent.map((item ) => {
                        return (
                            <Link className='  min-w-36 mr-1'  key={item.id} to={`/watch/${item.id}`}>
                            <img className={`object-cover h-56  `}  src={item.poster_path ? SMALL_IMG_BASE_URL+item.poster_path : SMALL_IMG_BASE_URL+item.backdrop_path} />
                            <h3 className='text-sm px-2'>{item.name || item.title || ''}</h3>
                            </Link>
                        )})}
                        {IsShowArrows && 
                        <>
                        <button
                        onClick={OnScrollLeft}
                        className='absolute top-[33%] md:top-[40%] md:left-10 left-5 bg-black/60 hover:bg-black/90 rounded-full p-1 '>
                            <ChevronLeft />
                        </button>
                        <button
                        onClick={OnScrollRight}
                        className='absolute top-[33%] md:top-[40%] md:right-10 right-5 bg-black/60 hover:bg-black/90 rounded-full p-1 '>
                            <ChevronRight />
                        </button>
                        </>
                        }
                    </div>    
                </div>
                </>
            )}  
        </div>
    </div>
  )
}

export default WatchPage