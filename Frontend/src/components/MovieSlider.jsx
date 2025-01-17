import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from './store/content'
import { SMALL_IMG_BASE_URL } from './utils/constants';
import {Link} from 'react-router-dom'
import { ChevronLeft , ChevronRight } from 'lucide-react';

function MovieSlider({catagory}) {
  const {contentType} = useContentStore() ; 
  const [content , setContent] = useState([]) ;
  const [IsShowArrows, setIsShowArrows] = useState(false)

  const SliderRef = useRef(null)

  useEffect(() => {
    const fetchContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${catagory}`)
      setContent(res.data.data)
    }
    fetchContent()
  } , [contentType])

  const FormattedCatagory = catagory.replaceAll("_" , " ").charAt(0).toUpperCase()+catagory.replaceAll("_" , ' ').slice(1)
  const FormattedCatagoryType = contentType === 'tv' ? 'TV Shows' : 'Movies'
 
 
  const OnScrollLeft = () => {
    if(SliderRef?.current){
      SliderRef.current.scrollBy({ left: -SliderRef.current.offsetWidth/2, behavior: "smooth" });
    }
  }
  const OnScrollRight = () => {
    if(SliderRef?.current){
      SliderRef.current.scrollBy({left : SliderRef.current.offsetWidth/2 , behavior : 'smooth'})
    }   
  }

 
  return (
  <>
    {content.length !== 0 && (
      <div className='bg-black text-white relative px-5 md:px-20 '>
      <h2 className='font-bold text-2xl pl-2 mb-2'>
        {FormattedCatagory} {FormattedCatagoryType}
      </h2>
      <div className='flex overflow-hidden w-full' ref={SliderRef}
        onMouseEnter={() => setIsShowArrows(true)}
        onMouseLeave={() => setIsShowArrows(false)}
      >
        {content.map((item) => (
          <Link className=' md:min-w-40 min-w-32 md:p-2   ' to={`/watch/${item.id}`} key={item.id}>
            <img className=' object-cover md:h-56  h-44 ' src={item?.poster_path ? SMALL_IMG_BASE_URL+item?.poster_path : SMALL_IMG_BASE_URL+item?.backdrop_path} alt={item?.name || 'name'} />
            <h3 className=' text-sm '>{item.name || item.title}</h3>
          </Link>
        ))}
        {IsShowArrows && 
        <>
          <button
          onClick={OnScrollLeft}
          className='absolute top-[40%] md:top-1/2 md:left-20 left-5 bg-black/60 hover:bg-black/90 rounded-full p-1 '>
            <ChevronLeft />
          </button>
          <button
          onClick={OnScrollRight}
          className='absolute top-[40%] md:top-1/2 md:right-20 right-5 bg-black/60 hover:bg-black/90 rounded-full p-1 '>
            <ChevronRight />
          </button>
        </>
        }
      </div>
    </div>
    )}
  </>
  )
}

export default MovieSlider