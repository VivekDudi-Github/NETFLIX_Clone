import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import ReactPlayer from 'react-player'

function WatchContentPage() {
//   useEffect(() => {
//     const fetchVideo = async() => {
//         await axios.get('/')
//     }
//   } , [])
    return (
    <div className='p-2 bg-black text-white min-h-screen'>
        <Navbar/>
        <div className='w-full duration-200'>
            <ReactPlayer width={'100%'}   url={'/api/v1/watch/video'} controls 
            className='w-full duration-200'
        />
        </div>
    </div>
  )
}

export default WatchContentPage