import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContentStore } from './store/content'
import { SMALL_IMG_BASE_URL } from './utils/constants';

function MovieSlider({catagory}) {
  const {contentType} = useContentStore() ; 

  const [content , setContent] = useState([]) 
console.log(contentType);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${catagory}`)
      console.log(res.data.data);
      setContent(res.data.data)
    }
    fetchContent()
  } , [contentType])

  const FormattedCatagory = catagory.replaceAll("_" , " ").charAt(0).toUpperCase()+catagory.replaceAll("_" , ' ').slice(1)
  const FormattedCatagoryType = contentType === 'tv' ? 'TV Shows' : 'Movies'
  return (
    <div className='bg-black text-white relative px-5 md:px-20 '>
      <h2>
        {FormattedCatagory} {FormattedCatagoryType}
      </h2>
      <div className='flex overflow-auto '>
        {content?.map((item) => (
          <div className=' min-w-40 p-2 mx-1  ' key={item.id}>
            <img className=' object-cover h-56 ' src={item?.poster_path ? SMALL_IMG_BASE_URL+item?.poster_path : SMALL_IMG_BASE_URL+item?.backdrop_path} alt={item?.name || 'name'} />
            <h3 className=' text-sm '>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieSlider