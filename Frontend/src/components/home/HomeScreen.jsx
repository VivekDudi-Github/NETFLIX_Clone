import React from 'react'
import { useAuthStore } from '../store/authUser'
import Navbar from '../Navbar'

function HomeScreen() {
  const {logout} = useAuthStore()
  return (
    <>
    <div className='relative h-screen text-white '>
      <Navbar />
      
      <img className='absolute top-0 left-0 -z-50 object-cover h-full w-full ' src='/extraction.jpg' />
      <div className=' bg-black/50 h-full w-full absolute top-0 left-0 '/>
      
      <div className=' h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-32  absolute top-0 left-0 '>
      <div className=' from-black to-transparent via-transparent bg-gradient-to-b h-full w-full absolute top-0 left-0 -z-40 '/>
        <div className='max-w-2xl '>
          <h1 className='mt-4 text-6xl font-extrabold text-balance'>
            Extraction
          </h1>
          <p className='mt-2 text-lg'>
            2014 | PG-12a
          </p>
          <p className='mt-4 text-lg '>
            Chris Hemsworth stars in this nonstop action-thriller with Ridraksh Jaiswal, Randeep Hooda and Golshifteh Farahani .
          </p>
        </div>
      </div>
    
    </div>
    </>
  )
}

export default HomeScreen