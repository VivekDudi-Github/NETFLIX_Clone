import React from 'react'
import { useAuthStore } from '../store/authUser'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import { Info, Play } from 'lucide-react'
import GetTrendingContent from '../hook/GetTrendingContent'
import { MOVIES_CATAGORIES, ORIGINAL_IMG_BASE_URL, TV_CATAGORIES } from '../utils/constants'
import { useContentStore } from '../store/content'
import MovieSlider from '../MovieSlider'

function HomeScreen() {
  const {trendingContent} = GetTrendingContent() ;
  const {contentType} = useContentStore() ;
  

  if(!trendingContent){
    return (
      <div className='h-screen text-white relative'>
        <Navbar />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10 bg-black  shimmer' />
      </div>
    )
  }

  

  return (
    <>
      <div className='relative h-screen text-white '>
        <Navbar />
        
        <img className='absolute top-0 left-0 -z-50 object-cover h-full w-full shimmer ' src={ORIGINAL_IMG_BASE_URL+trendingContent.backdrop_path} />
        <div className=' bg-black/20 h-full w-full absolute top-0 left-0 '/>
        
        <div className=' h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-32  absolute top-0 left-0 '>
        <div className=' from-black to-transparent via-transparent bg-gradient-to-b h-full w-full absolute top-0 left-0 -z-40 '/>
          <div className='max-w-2xl '>
            <h1 className='mt-4 text-6xl font-extrabold text-balance'>
              {trendingContent?.title || trendingContent.name || "Title not found :("}
            </h1>
            <p className='mt-2 text-lg'>
              { trendingContent.release_date?.slice(0 , 4) || trendingContent.first_air_date?.slice(0 , 4) || "Year"} | 
              {trendingContent.adult? " 18+" : " PG-13"}
            </p>
            <p className='mt-4 text-lg '>
              {trendingContent?.overview.length > 250 ? 
              trendingContent?.overview.slice(0 , 250)+"..." :
              trendingContent?.overview  
            }
            </p>
          </div>
          <div className='mt-8 flex '>
            <Link className='  bg-white hover:bg-white/80 text-black font-bold py-2 px-4 mr-4 flex items-center rounded duration-200' 
            to={'/watch/'+trendingContent?.id}>
              <Play className='size-6 mr-2 fill-black' />
              Play
            </Link>
            <Link className='  bg-gray-500/70 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center font-bold duration-200' 
            to={'/watch/123'}>
              < Info className='size-6 mr-2 ' />
              More Info
            </Link>
            
          </div>
        </div>
      
      </div>

      <div className='flex flex-col gap-10 bg-black py-10'>
        {contentType !== 'tv' ? (
          <div>
            {MOVIES_CATAGORIES.map((catagory) => 
             <MovieSlider key={catagory} catagory={catagory} /> 
            )}
          </div>
        ) : (
          <div>
            {TV_CATAGORIES.map((catagory) => 
              <MovieSlider key={catagory} catagory={catagory} />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default HomeScreen