import React, { useEffect, useState } from 'react'
import { useContentStore } from '../store/content';
import axios from 'axios';
import toast from 'react-hot-toast';

function GetTrendingContent() {
    const [trendingContent , setTrendingContent] = useState(null) ;
    const {contentType} = useContentStore()

      useEffect(() => {
          const FetchContent = async () => {
            try {
              const content =  await axios.get(`/api/v1/${contentType}/trending`)
              setTrendingContent(content.data.data)
            } catch (error) {
              toast('error while fetching')
            }
          }
          FetchContent() ;
      } , [contentType])
       
  
    return {trendingContent} 
    
}

export default GetTrendingContent